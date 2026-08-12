import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export const customValidationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
        const fields: Record<string, string> = {};
        errors.forEach((err) => {
            const firstMessage = Object.values(err.constraints ?? {})[0];
            fields[err.property] = firstMessage; // err.property가 정확한 필드명
        });

        return new BadRequestException({
            message: "입력값을 확인해주세요",
            fields,
        });
    },
});