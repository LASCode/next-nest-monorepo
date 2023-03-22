import {Controller} from '@nestjs/common';
import {TimeEntryService} from "./timeEntry.service";

@Controller('timeEntry')
export class TimeEntryController {
    constructor(private readonly timeEntryService: TimeEntryService) {}
}
