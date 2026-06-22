import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    AuthGuard
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
