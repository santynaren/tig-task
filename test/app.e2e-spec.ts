import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let shortURL;
  describe('complete workflow test', () => {
    // initally check for a url that doesnt exist
    it('should return error for a shortURL that doesnt exist', async () => {
      return request(app.getHttpServer())
        .post('/api/graphql')
        .send({
          query: `{getSourceLink(shortURL: "http://localhost:3000/urm35"){sourceURL id viewCount}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getSourceLink.id).toBe(0);
        });
    });
    // call shortURL
    it('returns a url object for the source URL provided', async () => {
      return request(app.getHttpServer())
        .post('/api/graphql')
        .send({
          query: `mutation{createShrinkLink(createShrinklinkInput: {
        sourceURL: "https://www.google.com/"
      }){
        shortURL id 
      }}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createShrinkLink.id).toBe(1);
          shortURL = res.body.data.createShrinkLink.shortURL;
        });
    });
  });

  it('check if page redirects', () => {
    return request(app.getHttpServer())
      .get('/' + shortURL.slice(-5))
      .expect(301);
  });

  it('verify the correct redirection occured', () => {
    return request(app.getHttpServer())
      .post('/api/graphql')
      .send({
        query:
          '{getSourceLink(shortURL:"' +
          shortURL +
          '" ){sourceURL id viewCount}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getSourceLink.sourceURL).toBe(
          'https://www.google.com/',
        );
        // check for viewcount increase
        expect(res.body.data.getSourceLink.viewCount).toBe(1);
      });
  });
});
