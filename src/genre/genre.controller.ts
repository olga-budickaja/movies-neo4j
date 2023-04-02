import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {GenreService} from "./genre.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";

@Controller('genres')
export class GenreController {

    constructor(private readonly genreService: GenreService) {}

    @Get('/')
    async getGenres() {
        return await this.genreService.getGenres()
    }

    @UseGuards(LocalAuthGuard)
    @Get('/user')
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
