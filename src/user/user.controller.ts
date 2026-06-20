import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from '../DTO/createUser.dto';
import { UserResponse } from 'src/types/userResponse.interface';
import { LoginUserDTO } from 'src/DTO/loginUser.dto';
import type { ExpressRequest } from 'src/types/expressRequest.interface';

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
    async currentUser(@Req() request: ExpressRequest): Promise<UserResponse> {
        if (!request.user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.userService.buildUserResponse(request.user);
    }

}
