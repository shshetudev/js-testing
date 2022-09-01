// importing supertest and app
const request = require('supertest')
const { response } = require('../../app')
const app = require('../../app')


// basic test case
it('should run', () => { })

describe('Todos', () => {
    it('GET /todos --> todos array', () => {
        return request(app).get('/todos')
            .expect('Content-Type', /json/) // asserting content type to be json
            .expect(200) // asserting response to be 200
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([  // asserting the response has array containing
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            completed: expect.any(Boolean)
                        })
                    ])
                )
            })
    })

    it('GET /todos/id --> specific todo by ID', () => {
        return request(app).get('/todos/1')
            .expect('Content-Type', /json/) // asserting content type to be json
            .expect(200) // asserting response to be 200
            .then(response => {
                expect(response.body).toEqual(
                        // asserting the object has name and completed property
                        expect.objectContaining({
                            name: expect.any(String),
                            completed: expect.any(Boolean)
                        })
                    ) // asserting the response has array containing
            })
    })

    it('GET /todos/id --> 404 if not found', () => {
        return request(app).get('/todos/999999').expect(404);
    })

    it('POST /todos --> created todo', () => {  
        return request(app).post('/todos').send({
            name: 'do dishes'
        })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(
                        expect.objectContaining({
                            name: 'do dishes',
                            completed: false
                        })
                    )
            })
    });

    it('POST /todos --> validates request body', () => {
        return request(app).post('/todos')
            .send({ name: 123 })
            .expect(422);
    });
})