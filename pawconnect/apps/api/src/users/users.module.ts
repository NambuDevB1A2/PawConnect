import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';
import { UsersUploadService } from './users-upload.service';

@Module({
  providers: [UsersService, UsersUploadService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
