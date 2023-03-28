import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {GenreService} from "./genre.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('genres')
export class GenreController {

    constructor(
        private readonly genreService: GenreService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getList(@Request() request) {
        return this.genreService.getGenresForUser(request.user)
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('/:id')
    // async getGenre(
    //     @Request() request,
    //     @Param('id', new ParseIntPipe()) id: number,
    //     @Query('orderBy', new DefaultValuePipe('title')) orderBy: string,
    //     @Query('page', new DefaultValuePipe(1), new DefaultValuePipe(1)) page: number,
    //     @Query('limit', new DefaultValuePipe(10), new ParseIntPipe()) limit: number,
    // ) {
    //     return this.genreService.getMoviesForGenre(request.user, id, orderBy, limit, page)
    // }
}
