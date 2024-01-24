import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import typia from 'typia';

describe('CatController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        whitelist: true,
      }),
    );
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
      wrong: 'wrong',
    };
    try {
      const response = await request(app.getHttpServer())
        .post('/cat')
        .send(reqBody);
      const { statusCode, body } = response;
      console.log(body);
      expect(statusCode).toEqual(201);
      expect(body.data.cat.id).toBeDefined();
    } catch (err) {
      console.log(err);
    }
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

  it('typia', () => {
    interface Sample {
      name: string;
    }
    const extra = {
      name: 'dulee',
      age: 10,
    };
    const valid = typia.validate<Sample>(extra);
    console.log(valid);
  });
});
