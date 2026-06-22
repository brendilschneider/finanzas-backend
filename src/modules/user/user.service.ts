import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../common/DTO/createUser.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config/config';
import { UserResponse } from 'src/common/types/userResponse.interface';
import { LoginUserDTO } from 'src/common/DTO/loginUser.dto';
import { compare } from 'bcrypt';
import { UpdateUserDTO } from 'src/common/DTO/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            where: {email: createUserDTO.email}
        });
        const userByUsername = await this.userRepository.findOne({
            where: {username: createUserDTO.username}
        });
         if(userByEmail || userByUsername) {
            throw new HttpException('Email or username are taken', 
            HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDTO);
        return await this.userRepository.save(newUser);
    }

    generateJWT(user: UserEntity): string {
      /*  const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);*/
        return sign({ 
            id: user.id, 
            username: user.username, 
            email: user.email 
            },
            JWT_SECRET,
          //  { expiresIn: exp }
        );
    }

    buildUserResponse(user: UserEntity): UserResponse {
        return {
            user: {
                ... user,
                token: this.generateJWT(user),
            }
        }
    }

    async findById(id: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }

    async login(loginDTO: LoginUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {email: loginDTO.email},
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                surname: true,
                bio: true,
                image: true,
                password: true 
            }
        });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const isPasswordCorrect = await compare(loginDTO.password, user.password);
        if (!isPasswordCorrect) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const { password, ...result } = user;
        return result as UserEntity;
    }

    async updateCurrentUser(id: number, updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
        const user = await this.findById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        Object.assign(user, updateUserDTO);
        return await this.userRepository.save(user);
    }

}
