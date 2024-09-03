import { DataSourceOptions } from 'typeorm';
import { Type } from './src/entity/Type';
import * as dotenv from 'dotenv';
import { Brand } from './src/entity/Brand';
import { Model } from './src/entity/Model';
import { Request } from './src/entity/Request';
import { Problem } from './src/entity/Problem';
import { Solution } from './src/entity/Solution';
import { Details } from './src/entity/Details';
import { RequestProblemDetails } from './src/entity/RequestProblemDetails';

dotenv.config();

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_FILE_HOST,
  port: parseInt(process.env.PG_FILE_PORT as string, 10),
  username: process.env.PG_FILE_USERNAME,
  password: process.env.PG_FILE_PASSWORD,
  database: process.env.PG_CORE_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Type, Brand, Model, Request, Problem, Solution, Details, RequestProblemDetails],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

export default ormconfig;
