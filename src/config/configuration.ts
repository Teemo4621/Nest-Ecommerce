import { AppConfig } from './dto/config.dto';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'postgres',
  },

  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKENJWT_SECRET || '',
    accessTokenExpirationHours:
      parseInt(process.env.ACCESS_TOKEN_EXPIRATION_HOURS as string, 10) || 1,

    refreshTokenSecret: process.env.REFRESH_TOKENJWT_SECRET || '',
    refreshTokenExpirationHours:
      parseInt(process.env.REFRESH_TOKEN_EXPIRATION_HOURS as string, 10) || 1,
  },
});
