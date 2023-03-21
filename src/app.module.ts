import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        Neo4jModule.forRoot({
            scheme: 'neo4j',
            host: 'localhost',
            port: 7687,
            username: 'neo4j',
            password: 'moviesneo'
        }),
    ]
})
export class AppModule {}