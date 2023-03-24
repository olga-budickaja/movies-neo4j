import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    postRegister(@Body() createUserDto: CreateUserDto) {
        return this.authService.postRegister(createUserDto)
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    postLogin(@Request() request) {
        return request.user.properties
    }
}
