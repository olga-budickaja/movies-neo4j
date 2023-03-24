import {Body, Controller, Post, UseGuards, Request, Get} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    postRegister(@Body() createUserDto: CreateUserDto) {
        return this.authService.postRegister(createUserDto)
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async postLogin(@Request() request) {
        return await this.authService.createToken(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() request) {
        const { id, email, dateOfBirth, firstName, lastName } = request.user.properties
        return { id, email, dateOfBirth: (new Date(dateOfBirth)).toISOString(), firstName, lastName }
    }
}
