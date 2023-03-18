import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppEnv = {
  MONGODB_LINK: process.env.MONGODB_LINK || 'Uwu',
  SERVER_PORT: process.env.SERVER_PORT || '3001',
} as const;
