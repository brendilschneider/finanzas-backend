import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from '../DTO/createUser.dto';
import { UserResponse } from 'src/types/userResponse.interface';

@Controller('users')
export class UserController {

    constructor( private readonly userService: UserService) {}

    @Post('')
    async createUser(@Body('user') createUserDTO: CreateUserDTO): Promise<UserResponse> {
       const user = await this.userService.createUser(createUserDTO);
       return this.userService.buildUserResponse(user);
    }

}
