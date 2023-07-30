import { Injectable } from '@nestjs/common';
import RegisterTeamDto from 'src/team/dto/register_team.dto';
import TeamDto from 'src/team/dto/team.dto';
import { AuthManager } from 'src/private/auth';
import { FirebaseManager } from 'src/private/firebase_manger';
import { FindResult } from 'src/private/types';
import RegistResDto from './dto/regist_res.dto';
import SimpleTeamInfoDto from './dto/simple_team.dto';
import { JoinRequestModel } from "src/team/model/join_request.model";

@Injectable()
export class TeamService {
    private readonly authManager : AuthManager
    private readonly firebaseManager : FirebaseManager;

    constructor() {
        this.firebaseManager = new FirebaseManager()
        this.authManager = new AuthManager(this.firebaseManager)
    }
    
    public async registerTeam(data : RegisterTeamDto) : Promise<RegistResDto> {
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
           .then(simpledata => this.authManager.addTeam(team.teamName, simpledata))
        } else throw "유효하지 않은 팀 정보 입니다."
    }
    
    
    public getTeamList() : SimpleTeamInfoDto[] | null {
        return this.authManager.getTeams()
    }

    public async subcribeTeam(teamCode : string, joinRequest : JoinRequestModel) : Promise<any>{
        try {
            const exist = this.authManager.findTeamByCode(teamCode)
            if(exist) {
                await this.firebaseManager.subcribeTeam(teamCode, joinRequest)
                return {message: '성공적으로 가입요청을 전달했습니다', result: true}
            }
            return {message: '존재 하지 않는 팀 입니다', result: false}
        } catch(e) {
            console.log(e)
            return {message: '예기치 못한 오류가 발생했습니다', result: false}
        }
    }

    public async removeSubcribeTeam(teamCode : string, joinRequest : JoinRequestModel) {
        try{
            const exist = this.authManager.findTeamByCode(teamCode)
            if(exist) {
                await this.firebaseManager.removeSubcribeTeam(teamCode, joinRequest)
            }
        } catch(e) { 
            console.log(e)
        }
    }
}
