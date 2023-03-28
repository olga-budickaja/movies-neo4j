import { Injectable } from '@nestjs/common';
import {Node} from "neo4j-driver";
import {Neo4jService} from "../neo4j/neo4j.service";
import {User} from "../user/user.service";

export type Subscription = Node
export const STATUS_PENDING = 'pending'
export const STATUS_ACTIVE = 'active'
export const STATUS_CANCELLED = 'cancelled'

export type SubscriptionStatus = typeof STATUS_PENDING | typeof STATUS_ACTIVE

@Injectable()
export class SubscriptionService {

    constructor(private readonly neo4jService: Neo4jService) {
    }

    async createSubscription(user: User, packageId: number, days: number = null): Promise<Subscription> {
        const userId: string = (<Record<string, any>> user.properties).id
        const res = await this.neo4jService.write(`
            MATCH (u:User {id: $userId})
            MATCH (p:Package {id: $packageId})
            
            CREATE (u)-[:PURCHASED]->(s:Subscription {
                id: randomUUID(),

                expiresAt: datetime() + CASE WHEN $days IS NOT NULL
                    THEN duration('P'+ $days +'D')
                    ELSE p.duration END
            })-[:FOR_PACKAGE]->(p)
            RETURN s
        `, { userId, packageId, days })

        return res.records[0].get('s')
    }
}
