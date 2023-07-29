import { IsString, IsInt } from "class-validator";

export default class SimpleTeamInfoDto {
    constructor()
    constructor(data : Map<string, any>)

    constructor(data? : Map<string, any>) {
        if(data != null) {
            this.teamCode = data['teamCode']
            this.teamName = data['teamName']
            this.memberCount = data['members'].length
            this.tier = data['tier']
            this.score = data['score']
            this.kindness = data['kindness']
            this.point = data['point']
        }
    }

    @IsString()
    teamCode: string

    @IsString()
    teamName: string

    @IsInt()
    memberCount: number

    @IsString()
    tier: string

    @IsString()
    score: string

    @IsString()
    kindness: string

    @IsInt()
    point: number
}