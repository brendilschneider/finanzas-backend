import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../DTO/createUser.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {sign} from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { UserResponse } from 'src/types/userResponse.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
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
}
