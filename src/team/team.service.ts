import { Injectable } from '@nestjs/common';
import RegisterTeamDto from 'src/team/dto/register_team.dto';
import TeamDto from 'src/team/dto/team.dto';
import { AuthManager } from 'src/private/auth';
import { FirebaseManager } from 'src/private/firebase_manger';
import { FindResult } from 'src/private/types';
import RegistResDto from './dto/regist_res_dto';

@Injectable()
export class TeamService {
    private readonly authManager : AuthManager
    private readonly firebaseManager : FirebaseManager;

    constructor() {
        this.firebaseManager = new FirebaseManager()
        this.authManager = new AuthManager(this.firebaseManager)
    }
    
    async registerTeam(data : RegisterTeamDto) : Promise<RegistResDto> {
        try {
            const randTeamCode : string | FindResult = this.authManager.createRandomTeamCode(data.teamName)
            if(randTeamCode === FindResult.DuplicatedTeamName) {
                return {team: null, message: "중복된 팀 이름", exception: "DuplicatedTeamName"}
            }
            const newTeam : TeamDto = new TeamDto(
                data,
                randTeamCode.toString(),
                `${this.firebaseManager.getServerTimeStamp()['seconds']}`
            )

            await this.addTeam(newTeam)
            .then(_=> console.log(`${data.teamName}팀 생성 완료.`))
            return {team: newTeam, message: null, exception: null}
        } catch(e) {
            console.log(e)
        }     
    }

    public async addTeam(team : TeamDto) : Promise<void> {
        if(team !== null && team !== undefined) {
           await this.firebaseManager.addDocuments('team', `${team.teamCode}`, team)
           .then(_=> this.authManager.addTeam(team.teamName, team.teamCode))
        } else throw "유효하지 않은 팀 정보 입니다."
    }     
}
