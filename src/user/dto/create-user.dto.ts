import {IsDate, IsEmail, IsNotEmpty, MaxDate} from "class-validator";
import {Type} from "class-transformer";

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    @MaxDate(require('moment')().subtract(13, 'y').toDate())
    dateOfBirth: Date;

    firstName?: string;
    lastName?: string;
}