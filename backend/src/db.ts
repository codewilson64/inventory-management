
import mysql from "mysql2/promise";
import "dotenv/config";

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};


const sslCa = process.env.DB_SSL_CA;

const db = mysql.createPool({
  host: requiredEnv("DB_HOST"),
  user: requiredEnv("DB_USER"),
  password: requiredEnv("DB_PASSWORD"),
  database: requiredEnv("DB_NAME"),
  port: Number(requiredEnv("DB_PORT")),
  ...(sslCa
    ? {
        ssl: {
          ca: sslCa,
          rejectUnauthorized: true,
        },
      }
    : {}),
});

export default db;

