import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterEach(() => app.close())

    describe('Auth', () => {
        describe('POST /auth/register', () => {
            it('should validate the request', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .set('Accept', 'application/json')
                    .send({
                        email: 'hello@example.com',
                        dateOfBirth: '2023-01-01'
                    })
                    .expect(400)
                    .expect(res => {
                        expect(res.body.message).toContain('password should not be empty')
                        expect(
                            res.body.message.find((m: string) => ('maximal allowed date for dateOfBirth'))
                        ).toBeDefined()
                    })
            })

            it('should return HTTP 200 successful on successful registration', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .set('Accept', 'application/json')
                    .send({
                        email: `user${Math.random().toString().substring(2)}@gmail.com`,
                        password: '123456',
                        dateOfBirth: '2000-01-01',
                        firstName: 'Adam',
                        lastName: 'Cowley'
                    })
                    .expect(201)
                    .expect(res => {
                        console.log(res.body)
                    })
            })
        })
    })

});