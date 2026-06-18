import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { AppDataSource } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
 imports: [
  TypeOrmModule.forRoot(AppDataSource.options),
  TagModule,
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
