import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User, UserService} from "../user/user.service";
import {EncryptionService} from "../encryption/encryption.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user !== undefined && await this.encryptionService.compare(password, (<Record<string, any>> user.properties).password)) {
            return user;
        }

        return null;
    }

    async postRegister(createUserDto: CreateUserDto): Promise<Record<string, any>> {
        const user = await this.userService.create(
            createUserDto.email,
            createUserDto.password,
            new Date(createUserDto.dateOfBirth),
            createUserDto.firstName,
            createUserDto.lastName
        )
        return await this.createToken(user)
    }

    async createToken(user: User) {
        const { id, email, dateOfBirth, firstName, lastName } = <Record<string, any>> user.properties;

        return {
            access_token: this.jwtService.sign({
                sub: id,
                email, dateOfBirth, firstName, lastName,
            }),
        }

    }

}
