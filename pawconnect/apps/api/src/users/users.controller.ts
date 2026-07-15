import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UsersService } from '@/users/users.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
}
