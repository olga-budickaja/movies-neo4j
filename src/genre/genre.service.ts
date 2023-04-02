import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { STATUS_ACTIVE } from '../subscription/subscription.service';
import {User} from "../user/user.service";

export interface Genre {
    id: number;
    name: string;
    numMovies?: number;
}

@Injectable()
export class GenreService {

    constructor(private readonly neo4jService: Neo4jService) {}

    async getGenres(): Promise<Genre[]> {
        try {
            const res = await this.neo4jService.read(`
                MATCH (g:Genre)<-[:IN_GENRE]-(m:Movie)
                WITH g, count(m) AS numMovies
                ORDER BY numMovies DESC
                RETURN g.id, g.name, numMovies
        `, {});

         return res.records.map((record: Record<string, any>) => {
             return {
                 id: record.get('g.id'),
                 name: record.get('g.name'),
                 numMovies: record.get('numMovies'),
             }
         })

        } catch (e) {
            console.log(e)
        }
    }

    async getGenresForUser(user: User): Promise<Genre[]> {
        const userId: string = (<Record<string, any>> user.properties).id
        const res = await this.neo4jService.read(`
                MATCH (u:User {id: $userId})-[:PURCHASED]->(s)-[:FOR_PLAN]->(p)
                WHERE s.expiresAt >= datetime() AND s.status = $status
                OPTIONAL MATCH (p)-[:PROVIDES_ACCESS_TO]->(g)<-[:IN_GENRE]-(m)
                WHERE m.poster_path IS NOT NULL
                WITH p, g, m ORDER BY g.name, m.releaseDate DESC
                WITH p, g, collect(m) AS movies
                WITH p, g, movies[0] as topMovie
                RETURN p, collect({
                    id: g.id,
                    name: g.name,
                    totalMovies: size([(g)<-[:IN_GENRE]-() | 1]),
                    poster: topMovie.poster
                }) AS genres
        `, { userId, status: STATUS_ACTIVE })

        if ( res.records.length == 0 ) {
            throw new UnauthorizedException('You have no active subscriptions')
        }

        return res.records[0].get('genres')
    }

    // async getMoviesForGenre(user: User, genreId: number, orderBy: string, limit: number, page: number) {
    //     const userId = user.getId()
    //     const res = await this.neo4jService.read(`
    //         MATCH (u:User {id: $userId})-[:PURCHASED]->(s)-[:FOR_PLAN]->(p)
    //         WHERE s.expiresAt >= datetime() AND s.status = $status
    //         OPTIONAL MATCH (p)-[:PROVIDES_ACCESS_TO]->(g {id: $genreId})
    //         OPTIONAL MATCH (g)<-[:IN_GENRE]-(m:Movie)
    //             WHERE ( u.dateOfBirth <= datetime() - duration('P18Y') OR NOT m:Adult )
    //         RETURN s,
    //         g,
    //         m
    //         ORDER BY m.title ASC
    //         SKIP $skip
    //         LIMIT $limit
    //     `, {
    //         userId,
    //         genreId: int(genreId),
    //         skip: int( (page-1) * limit ),
    //         limit: int(limit),
    //         status: STATUS_ACTIVE,
    //     })
    //
    //     if ( res.records.length == 0 ) {
    //         throw new UnauthorizedException('You have no active subscriptions')
    //     }
    //     else if ( !res.records[0].get('g') ) {
    //         throw new NotFoundException('Cannot find genre')
    //     }
    //
    //     return res.records.map(row => row.get('m'))
    // }

}
