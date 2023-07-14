import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Users, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async user(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Users[]> {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    try {
      const { email, name, password, ...rest } = data;

      const nameRegex = '^[A-Za-z\\s]+$';
      if (!name.match(nameRegex)) {
        throw new Error('Invalid name format. Only letters and spaces are allowed.');
      }
      const hashedPassword = await hash(password, 10);

      const emailRegex = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
      if (!email.match(emailRegex)) {
        throw new Error('Invalid email format.');
      }
      const createdUser = await this.prisma.users.create({
        data: {
          email,
          name,
          password: hashedPassword,
          ...rest,
        },
      })
      return createdUser;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'User could not be created',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    }

  }


  async updateUser(params: {
    user_id: string,
    where: Prisma.UsersWhereUniqueInput,
    data: Prisma.UsersUpdateInput,
  }): Promise<Users> {
    const { user_id, where, data } = params;
    const existingUser = await this.prisma.users.findUnique({ where: { user_id: +user_id } });
    if (!existingUser) {
      throw new Error(`User with ID ${user_id} not found.`);
    }
    if (data.password) {
      // Hash the new password using bcrypt
      const hashedPassword = await hash(data.password as string, 10);
      data.password = hashedPassword;
    }
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prisma.users.delete({
      where
    });
  }

  async createUserPassword(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({
      data
    })
  }

  async updateUserPassword(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    })
  }
}
