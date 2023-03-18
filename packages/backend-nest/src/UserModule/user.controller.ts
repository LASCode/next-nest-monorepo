import {Controller, Get, Param, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../_Common/Guards/auth.guard";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    getMe() {
        return this.userService.getMe();
    }

    @Get('/all')
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id);
    }


}