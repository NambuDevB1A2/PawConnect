import { Controller, UseGuards } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Shelter')
@Controller('shelters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SheltersController {
    constructor (private readonly sheltersService: SheltersService) {}

}
