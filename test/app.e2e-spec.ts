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
        const email = `user${Math.random().toString().substring(2)}@gmail.com`;
        const password = Math.random().toString().substring(3);
        let token, genreId;

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
                        email,
                        password,
                        dateOfBirth: '2000-01-01',
                        firstName: 'Adam',
                        lastName: 'Cowley'
                    })
                    .expect(201)
                    .expect(res => {
                        expect(res.body.access_token).toBeDefined()
                    })
            })
        })

        describe('POST /auth/login', () => {

            it('should return 404 if username doesnt exist', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email: 'unknown', password: 'anything'})
                    .expect(401)
            })

            it('should return 404 if password is incorrect', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email, password: 'anything'})
                    .expect(res => console.log(res.body))
                    .expect(401)
            })

            it('should return 201 if password is incorrect', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email, password})
                    .expect(201)
                    .expect(res => {
                        expect(res.body.access_token).toBeDefined()
                        token = res.body.access_token
                    })
            })

        })

        describe('GET /auth/user', () => {
            it('should return unauthorized if no token is provided', () => {
                return request(app.getHttpServer())
                    .get('/auth/user')
                    .expect(401)
            })

            it('should return unauthorized  on incorrect token', () => {
                return request(app.getHttpServer())
                    .get('/auth/user')
                    .set('Authorization', `Bearer incorrect`)
                    .expect(401)
            })

            it('should authenticate a user with JWT token', () => {
                return request(app.getHttpServer())
                    .get('/auth/user')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.email).toBe(email)
                        expect(res.body.password).toBeUndefined()
                    })
            })
        })

        describe('GET /genres', () => {
            it('should return unauthorised if no token is provided', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .expect(401)
            })

            it('should return unauthorised on incorrect token', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .set('Authorization', `Bearer incorrect`)
                    .expect(401)
            })

            it('should authenticate a user with the JWT token', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.length).toEqual(20)

                        res.body.forEach(row => {
                            expect( Object.keys(row) ).toEqual(
                                expect.arrayContaining(['id', 'name'])
                            )
                        })

                        // Assigning genre for nest test
                        genreId = res.body[0].id
                    })
            })
        })


        // describe('GET /genres/:id', () => {
        //     it('should return unauthorized if no token is provided for genres for user', () => {
        //         return request(app.getHttpServer())
        //             .get(`/genres/${genreId}`)
        //             .expect(401)
        //     })
        //
        //     it('should return unauthorized  on incorrect token for genres for user', () => {
        //         return request(app.getHttpServer())
        //             .get(`/genres/${genreId}`)
        //             .set('Authorization', `Bearer incorrect`)
        //             .expect(404)
        //     })
        //
        //     it('should authenticate a user with JWT token for genres for user', () => {
        //         return request(app.getHttpServer())
        //             .get(`/genres/${genreId}`)
        //             .set('Authorization', `Bearer ${token}`)
        //             // .expect(200)
        //             .expect(res => {
        //                 console.log(res.body)
        //                 // expect(res?.body.length).toEqual(20)
        //                 //
        //                 // res?.body.forEach(row => {
        //                 //
        //                 //     expect(Object.keys(row)).toEqual(
        //                 //         expect.arrayContaining(['id', 'name'])
        //                 //     )
        //                 //
        //                 // })
        //             })
        //     })
        // })
    })

});