const request = require('supertest');
const app = require('../app')
const { faker } = require('@faker-js/faker');
const { default: mongoose } = require('mongoose');

describe('Tests route register', () => {
    test('Register return 201', () => {
        return request(app)
            .post('/auth/register')
            .send({
                login: faker.internet.userName(),
                password: faker.internet.password()
            })
            .then(response => {
                console.log(response.body)
                expect(response.statusCode).toBe(201)
            })
    })

    test('Register test missing login', () => {
        return request(app)
            .post('/auth/register')
            .send({
                login: "",
                password: faker.internet.password()
            })
            .then(response => {
                console.log(response.body)
                expect(response.statusCode).toBe(422)
            })
    })

    afterAll(() => { mongoose.connection.close()})
})