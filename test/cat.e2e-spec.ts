import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CatController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cat?age=3 (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/cat?age=3');
    const { statusCode, body } = response;

    expect(statusCode).toEqual(200);
    expect(body.data.cats.length).toEqual(2);
  });

  it('/cat (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/cat');
    const { statusCode, body } = response;

    expect(statusCode).toEqual(200);
    expect(body.data.cats.length).toEqual(3);
  });

  it('/cat/018d3ce1-bbee-7358-b7ed-4cdc36e39219 (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/cat/018d3ce1-bbee-7358-b7ed-4cdc36e39219',
    );
    const { statusCode, body } = response;

    expect(statusCode).toEqual(200);
    expect(body.data.cat).toBeDefined();
  });

  it('/cat/018d3ce1-bbee-7358-b7ed-4cdc36e3921a error (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/cat/018d3ce1-bbee-7358-b7ed-4cdc36e3921a',
    );
    const { statusCode, body } = response;

    expect(statusCode).toEqual(404);
  });

  it('/cat (POST)', async () => {
    const reqBody = {
      name: 'kim',
      age: 7,
    };
    const response = await request(app.getHttpServer())
      .post('/cat')
      .send(reqBody);
    const { statusCode, body } = response;

    expect(statusCode).toEqual(201);
    expect(body.data.cat.id).toBeDefined();
  });

  it('/cat/018d3ce1-bbee-7358-b7ed-4cdc36e3921a (PATCH)', async () => {
    const reqBody = {
      name: 'kim',
    };
    const response = await request(app.getHttpServer())
      .patch('/cat/018d3ce1-bbee-7358-b7ed-4cdc36e3921a')
      .send(reqBody);
    const { statusCode, body } = response;

    expect(statusCode).toEqual(200);
    expect(body.data.cat.id).toEqual('018d3ce1-bbee-7358-b7ed-4cdc36e3921a');
    expect(body.data.cat.name).toEqual('kim');
  });

  it('/cat/018d3ce1-bbee-7358-b7ed-4cdc36e39219 (DELETE)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/cat/018d3ce1-bbee-7358-b7ed-4cdc36e39219',
    );
    const { statusCode, body } = response;

    expect(statusCode).toEqual(200);
  });
});
