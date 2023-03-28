import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {AuthModule} from "../auth/auth.module";
import {EncryptionModule} from "../encryption/encryption.module";
import {SubscriptionModule} from "../subscription/subscription.module";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        forwardRef(() => AuthModule),
        EncryptionModule,
        SubscriptionModule,
    ],
    exports: [UserService]
})
export class UserModule {}
