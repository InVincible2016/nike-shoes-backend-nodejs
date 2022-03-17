jest.mock('node-fetch');
const fetch = require('node-fetch');
const {Response} = jest.requireActual('node-fetch');
const request = require('supertest');
const server = require('./index');

describe('GET /shoe-price/:id', () => {
    beforeEach(() => {
        fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({shoePrice: 100}))));
    })
    
    it('respond with shoePrice as JSON', (done) =>{
        request(server)
            .get('/api/shoe-price/1')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.shoePrice).toBeDefined();
                return done();
            });
    });

    it('handles werid id', (done) =>{
        request(server)
            .get('/api/shoe-price/ajlskdjalksndeownaofsdufoisdufioehwo12i410#$#@Q/*--)(*&^%$#@!dfsjahfji\\_(){}|[]\;\'\,\.\///')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.shoePrice).toBeDefined();
                return done();
        });
    });
});

describe('GET /shoe-discount-price/:id', () => {
    beforeEach(() => {
        fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({shoePrice: 100}))));
    })

    it('respond with shoePrice and discountPrice as JSON', (done) =>{
        request(server)
            .get('/api/shoe-discount-price/1')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.shoePrice).toBeDefined();
                expect(res.body.discountPrice).toBeDefined();
                return done();
        });
    });

    it('handles werid id', (done) =>{
        request(server)
            .get('/api/shoe-discount-price/ajlskdjalksndeownaofsdufoisdufioehwo12i410#$#@Q/*--)(*&^%$#@!dfsjahfji\\_(){}|[]\;\'\,\.\///')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.shoePrice).toBeDefined();
                expect(res.body.discountPrice).toBeDefined();
                return done();
        });
    });
});

describe('GET /', () => {
    it('enables CORS', (done) =>{
        request(server)
            .options('/')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(204, done)
    });
});

afterAll(() =>{
    server.close()
})