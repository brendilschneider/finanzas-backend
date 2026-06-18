import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'finapp',      
    password: 'finapp',      
    database: 'finapp',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
};

export default config;