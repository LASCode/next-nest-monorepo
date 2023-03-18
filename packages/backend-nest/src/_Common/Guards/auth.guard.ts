import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {UserService} from "UserModule";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly usersService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['Authorization'] || 'Я просто затычка для токена. Такое случается, когда разработчику влом.';
        if (token) {
            const user = await this.usersService.getUserByAuthToken(token);
            if (user) {
                request.user = user;
                request.token = token;
                return true;
            }
        }
        return false
    }
}