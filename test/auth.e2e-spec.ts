import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import * as http from 'http';
import cookieSession from 'cookie-session';
import { rm } from 'fs/promises';
import { join } from 'path';

interface SignupResponse {
  id: number;
  email: string;
}

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // Har test run hone se pehle purani test.sqlite delete karo
    try {
      await rm(join(__dirname, '..', 'test.sqlite'));
    } catch {
      // ignore error if file doesn't exist
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Global Pipes aur Middleware
    app.use(
      cookieSession({
        keys: ['my-secret-key'],
      }),
    );
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  it('handles a signup request', () => {
    const testEmail = 'testuser@test.com';

    return request(app.getHttpServer() as http.Server)
      .post('/auth/signup')
      .send({ email: testEmail, password: 'password123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body as SignupResponse;

        // Assertions
        expect(id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });
});
