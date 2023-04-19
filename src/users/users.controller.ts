
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query
} from '@nestjs/common';
import { UserService } from '../prismaservices/user.service';
import { Users as UserModel } from "@prisma/client"



@Controller()
export class AppController {
    constructor(
        private readonly userService: UserService,

    ) { }


    @Post('user')
    async signupUser(
        @Body() CreateUserDto: { name: string, email: string, password: string })
        : Promise<UserModel> {
        return this.userService.createUser(CreateUserDto);
    }

 
    @Get('users')
    async getAllUser(@Param('id') id: number): Promise<UserModel[]>{
     return this.userService.users({});
    }

    @Delete('user/:id')
    async deleteUserById(@Param('id') id: number): Promise<UserModel> {
        return this.userService.deleteUser({})
    }

    @Put('user/:id')
    async updateUserById(
        @Param('id') id: number,
        @Body() UpdateCreateUserDto: {name: string, email:string, password:string}
    ): Promise<UserModel> {
        return this.userService.updateUser({ where: { id }, data: UpdateCreateUserDto})
    }
    

}