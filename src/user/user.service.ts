import { Injectable } from '@nestjs/common';
import { Node, types } from "neo4j-driver";
import {Neo4jService} from "../neo4j/neo4j.service";

export type User = Node

@Injectable()
export class UserService {
    constructor(private readonly neo4jService: Neo4jService) {}

    async create(
        email: string,
        password: string,
        dateOfBirth: Date,
        firstName?: string,
        lastName?: string
    ): Promise<User> {
        const res = await this.neo4jService.write(`
             CREATE (u:User)
             SET u += $properties, u.id = randomUUID()
             RETURN u
        `, {
            properties: {
                email,
                password,
                dateOfBirth: types.Date.fromStandardDate(dateOfBirth),
                firstName,
                lastName
            },
        })

        return res.records[0].get('u')
    }

}
