import { TestsController } from '@/tests/tests.controller';
import { TestsService } from '@/tests/tests.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TestsService],
  controllers: [TestsController]
})
export class TestsModule {}
