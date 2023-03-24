import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {EncryptionModule} from "../encryption/encryption.module";
import {localStrategy} from "./local.strategy";

@Module({
  imports: [
      forwardRef(() => UserModule),
      EncryptionModule
  ],
  providers: [AuthService, localStrategy],
  controllers: [AuthController],
  exports: [
      AuthService
  ]
})
export class AuthModule {}
