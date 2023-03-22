import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "_Common/Guards/auth.guard";
import {ProjectService} from "./project.service";
import {INPUT_CreateProject} from "./inputs/create-project.input";
import {INPUT_StartTimer} from "./inputs/start-timer.input";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    createProject(@Body() body: INPUT_CreateProject) {
        return this.projectService.createProject({
            working_period_id: body.working_period_id,
            name: body.name,
        });
    }

    @UseGuards(AuthGuard)
    @Post('/start')
    startTimer(@Body() body: INPUT_StartTimer) {
        return this.projectService.startTimer({
            project_id: body.project_id,
        });
    }
    @UseGuards(AuthGuard)
    @Post('/stop')
    stopTimer(@Body() body: INPUT_StartTimer) {
        return this.projectService.stopTimer({
            project_id: body.project_id,
        });
    }
}
