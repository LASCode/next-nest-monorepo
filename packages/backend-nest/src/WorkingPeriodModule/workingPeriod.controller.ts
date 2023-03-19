import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {WorkingPeriodService} from "./workingPeriod.service";
import {INPUT_CreateWorkingPeriod} from "./inputs";
import {AuthGuard} from "../_Common/Guards/auth.guard";
import {D_User} from "../_Common/Decorators";
import {User} from "../UserModule/user.types";
import {getSlicedTimestamp} from "../_Common/Utils";

@Controller('workingPeriod')
export class WorkingPeriodController {
    constructor(private readonly workingPeriodService: WorkingPeriodService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    createWorkingPeriod(@Body() body: INPUT_CreateWorkingPeriod, @D_User() user: User) {
        const { assignedDay } = body;

        console.log(assignedDay)
        return this.workingPeriodService.createWorkingPeriod({
            user_id: user.id,
            assignedDay: assignedDay,
        });
    }

    @UseGuards(AuthGuard)
    @Get('/')
    getWorkingPeriod(@D_User() user: User) {
        return this.workingPeriodService.getWorkingPeriods({
            user_id: user.id,
        });
    }
}