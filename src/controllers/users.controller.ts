
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
import { ApiProperty, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UserService } from '../prismaservices/user.service';
import { Prisma, Users as UserModel, Users } from "@prisma/client"
import { CreateUserDto } from 'src/api-interfaces/create-user-dto/entities/create-user-dto.entity';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,

    ) { }

    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {

                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },
    })
    async signupUser(
        @Body() CreateUserDto: CreateUserDto)
        : Promise<Users> {
        try {
            const user = await this.userService.createUser(CreateUserDto)
            console.log("User=", user)
            return user;
        } catch (err) {
            console.log(err)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'User could not be created',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });
        }
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
    @ApiBody({
        schema: {
            type: 'object',
            properties: {

                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },
    })
    async updateUserById(
        @Param('id') user_id: string,
        @Body() UpdateCreateUserDto: { name: string, email: string, password: string, }
    ): Promise<UserModel> {
        try {
            const { name, email, password } = UpdateCreateUserDto;
            const updateData: Prisma.UsersUpdateInput = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateData.password = hashedPassword;
            }
            return this.userService.updateUser({
                user_id: user_id,
                where: { user_id: +user_id },
                data: updateData,
            });

        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'This user could not be updated.',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });
        }
    }
}