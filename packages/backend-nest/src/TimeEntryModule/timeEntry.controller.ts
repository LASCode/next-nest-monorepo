import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {TimeEntryService} from "./timeEntry.service";
import {INPUT_CreateTimeEntry} from "./inputs/create-time-entry.input";
import {AuthGuard} from "../_Common/Guards/auth.guard";

@Controller('timeEntry')
export class TimeEntryController {
    constructor(private readonly timeEntryService: TimeEntryService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    createTimeEntry(@Body() body: INPUT_CreateTimeEntry) {
        return this.timeEntryService.createTimeEntry({
            project_id: body.project_id,
            started_in: body.started_in
        });
    }
}
