import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const res = exception.getResponse() as any;

        // class-validator 에러를 배열로 변환
        // "password must be..." → "password"
        const fields: Record<string, string> = {};

        if (Array.isArray(res.message)) {
            res.message.forEach((msg: string) => {
                const field = msg.split(" ")[0];
                fields[field] = msg;
            });
        }

        response.status(status).json({
            statusCode: status,
            message: Array.isArray(res.message) ? "입력값을 확인해주세요" : res.message,
            fields,
        });

        // 에러 발생시 아래처럼 처리할 것
        // throw new ConflictException({
        //     message: "이미 사용중일 이메일입니다",
        //     fields: { email: "이미 사용중인 이메일입니다" }.
        // });
        // FE에서 필드 값을 각 input값에 넣어서 에러 메세지를 표시할 것
    }
}