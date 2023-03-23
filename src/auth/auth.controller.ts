import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    postRegister(@Body() createUserDto: CreateUserDto) {
        return this.authService.postRegister(createUserDto)
    }
}
