import { RegisterUserAuthDto } from "@/auth/dto/register-auth.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto extends RegisterUserAuthDto {
    @ApiProperty()
    @IsString()
    passwordHash: string;
}