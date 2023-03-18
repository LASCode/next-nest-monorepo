import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "_Common/Guards/auth.guard";
import {ProjectService} from "./project.service";
import {INPUT_CreateProject} from "./inputs/create-project.input";

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
}
