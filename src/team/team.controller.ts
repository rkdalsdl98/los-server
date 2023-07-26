import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import RegistResDto from './dto/regist_res_dto';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService : TeamService){}

    @Post('regist')
    async registerteam(@Body() data : any) : Promise<RegistResDto> {
        return this.teamService.registerTeam(data);
    }
}
