import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const D_Token = createParamDecorator<any, any, any>(
    (data, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.token;
    },
);