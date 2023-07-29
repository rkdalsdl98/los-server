import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import RegistResDto from './dto/regist_res.dto';
import SimpleTeamInfoDto from './dto/simple_team.dto';
import JoinRequestModel from './model/join_request.model';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService : TeamService){}

    @Post('regist')
    async registerteam(@Body() data : any) : Promise<RegistResDto> {
        return this.teamService.registerTeam(data);
    }

    @Get('list')
    async getTeamList() : Promise<SimpleTeamInfoDto[] | null> {
        return this.teamService.getTeamList();
    }

    @Post('join/:teamcode')
    async joinTeam(@Body() req : JoinRequestModel, @Param('teamcode') teamcode : string) {
        return await this.teamService.subcribeTeam(teamcode, req)
    }

    @Delete('remove/:teamcode')
    async removeSubcribeTeam(@Body() req : JoinRequestModel, @Param('teamcode') teamcode : string) {
        return await this.teamService.removeSubcribeTeam(teamcode, req)
    }
}
