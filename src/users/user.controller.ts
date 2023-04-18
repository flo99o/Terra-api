
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
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
        @Body() userData: { name?: string; email: string; password: string; },
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get('user/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        return this.userService.user({ id: Number(id) });
    }

    @Delete('user/:id')
    async deleteUser(@Param('id') id:string): Promise<UserModel>{
        return this.userService.deleteUser({id: Number(id)})
    }


}