import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".development.env" });

const isProduction = process.env.NODE_ENV === "production";

const config: DataSourceOptions = isProduction // CUANDO ESTOY EN PRODUCCION USO LA BD DE RENDER
  ? {
      type: "postgres",
      url: process.env.DATABASE_URL, // Usar la URL completa en producción
      ssl: {
        rejectUnauthorized: false, // Necesario para Render
      },
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ["dist/migrations/*{.ts,.js}"],
      synchronize: false, //  En producción, mejor usar migraciones
      dropSchema: false, //  NO eliminar la BD en producción
    }
  : {
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ["dist/migrations/*{.ts,.js}"],
      synchronize: true,
      dropSchema: true,
    };

export default registerAs("typeorm", () => config);

export const connectSource = new DataSource(config);
