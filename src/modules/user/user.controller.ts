import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from '../../common/DTO/createUser.dto';
import { UserResponse } from 'src/common/types/userResponse.interface';
import { LoginUserDTO } from 'src/common/DTO/loginUser.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateUserDTO } from 'src/common/DTO/updateUser.dto';

@Controller('users')
export class UserController {

    constructor( private readonly userService: UserService) {}

    @Post('')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDTO: CreateUserDTO): Promise<UserResponse> {
       const user = await this.userService.createUser(createUserDTO);
       return this.userService.buildUserResponse(user);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginDTO: LoginUserDTO): Promise<UserResponse> {
       const user = await this.userService.login(loginDTO);
       return this.userService.buildUserResponse(user);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<UserResponse> {
        return this.userService.buildUserResponse(user);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(@User('id') id: number, @Body('user') updateUserDTO: UpdateUserDTO): Promise<UserResponse> {
        const updatedUser = await this.userService.updateCurrentUser(id, updateUserDTO);
        return this.userService.buildUserResponse(updatedUser);
    }

}
