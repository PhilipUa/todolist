import type { IConfig } from '../interfaces/config.interface';

const config: IConfig = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs Todo list',
    description: 'Api description',
    version: '1.0',
    path: 'api',
  },
  security: {
    expiresIn: '15m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
    algorithm: 'HS256',
  },
};

export default (): IConfig => config;
