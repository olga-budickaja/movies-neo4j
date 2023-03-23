import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import { Neo4jModule } from './neo4j/neo4j.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as process from "process";
import {Neo4jConfig} from "./neo4j/neo4j-config.interface";
import { EncryptionModule } from './encryption/encryption.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        Neo4jModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): Neo4jConfig => ({
                scheme: 'neo4j',
                host: configService.get('NEO4J_HOST'),
                port: configService.get('NEO4J_PORT'),
                username: configService.get('NEO4J_USERNAME'),
                password: configService.get('NEO4J_PASSWORD')
            })
        }),
        AuthModule,
        UserModule,
        EncryptionModule,
    ]
})
export class AppModule {}