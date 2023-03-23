import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async postRegister(createUserDto: CreateUserDto): Promise<Record<string, any>> {
        const user = await this.userService.create(
            createUserDto.email,
            createUserDto.password,
            new Date(createUserDto.dateOfBirth),
            createUserDto.firstName,
            createUserDto.lastName
        )
        return { user: user.properties }
    }
}
