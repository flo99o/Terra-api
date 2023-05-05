
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query,
    HttpStatus,
    HttpException
} from '@nestjs/common';
import { UserService } from '../prismaservices/user.service';
import { Users as UserModel } from "@prisma/client"




@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,

    ) { }


    @Post('user')
    async signupUser(
        @Body() CreateUserDto: { name: string, email: string, password: string })
        : Promise<UserModel> {
        try {
            this.userService.createUser
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'User could not be created',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });
        }
        return this.userService.createUser(CreateUserDto);
    }


    @Get('users')
    async getAllUser(@Param('id') id: number): Promise<UserModel[]> {
        try {
            this.userService
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'Failed to get all users. Please try again later.',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });
        }
        return this.userService.users({});
    }

    @Delete('user/:id')
    async deleteUserById(@Param('id') user_id: number): Promise<UserModel> {

        return this.userService.deleteUser({ user_id })
    }

    @Put('user/:id')
    async updateUserById(
        @Param('id') user_id: number,
        @Body() UpdateCreateUserDto: { name: string, email: string, password: string, }
    ): Promise<UserModel> {
        return this.userService.updateUser({ where: { user_id }, data: UpdateCreateUserDto })

    }


}