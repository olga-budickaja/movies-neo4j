import {Controller, Get, Param, Request} from '@nestjs/common';
import {MoviesService} from "./movies.service";

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get('/')
    async getMovies(
        @Request() request: Request
    ) {
        return await this.moviesService.getMovies(request)
    }

    @Get('/:genreName')
    async getMoviesForGenre(@Param('genreName') genreName: string) {
        return await this.moviesService.getMoviesForGenre(genreName)
    }
}
