import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { SheltersService } from '@/shelters/shelters.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Shelter')
@Controller('shelters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SheltersController {
    constructor (private readonly sheltersService: SheltersService) {}

}
