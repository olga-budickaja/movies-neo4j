import {Controller, Get} from "@nestjs/common";
import {AppService} from "./app.service";

@Controller('/api')
export class AppController {

    constructor(private appService: AppService) {}
    @Get('/movies')
    async getHello(): Promise<string> {
        const greeting = await this.appService.getHello()
        return greeting;
    }
}