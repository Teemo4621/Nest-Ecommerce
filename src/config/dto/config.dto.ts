export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpirationHours: number;
  refreshTokenSecret: string;
  refreshTokenExpirationHours: number;
}

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

export interface AppConfig {
  port: number;
  db: DbConfig;
  jwt: JwtConfig;
}
