import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
 imports: [
   /* TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario',      // Reemplazar con usuario de Postgres
      password: 'tu_password',      // Reemplazar con contraseña
      database: 'finanzas_db',
      entities: [Transaction],
      synchronize: true, // Esto creará la tabla automáticamente en la BD
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
