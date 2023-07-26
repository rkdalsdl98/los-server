import { IsString, Validate, ValidatorConstraintInterface, ValidatorConstraint, IsNotEmpty, IsArray, ValidationArguments, IsInt, Min, Max, IsTimeZone } from "class-validator";

import MemberModel from "../model/member.model";
import JoinRequestModel from "../model/join_request.model";
import GameDetailModel from "../model/game_detail.model";
import RegisterTeamDto from "./register_team.dto";
import RequesterDto from "./requester.dto";

@ValidatorConstraint()
class IsMemberArray implements ValidatorConstraintInterface {
    public async validate(members: MemberModel[], args?: ValidationArguments) : Promise<boolean> {
        return Array.isArray(members) && members.reduce((a, b) => a && typeof b.email === "string" && typeof b.nickname === "string" && typeof b.phoneNumber === "string" && b.privateId === "string" && b.profileImageUrl === "string", true)
    }
}

@ValidatorConstraint()
class IsJoinRequestArray implements ValidatorConstraintInterface {
    public async validate(requests: JoinRequestModel[], args?: ValidationArguments) : Promise<boolean> {
        return Array.isArray(requests) && requests.reduce((a, b) => a && typeof b.privateId === 'string' && typeof b.nickName === 'string' && typeof b.age === "string" && typeof b.detailInfo === "object" && typeof b.height === "string" && typeof b.profileImageUrl === "string" && typeof b.weight === "string", true)
    }
}

@ValidatorConstraint()
class IsGameDetailArray implements ValidatorConstraintInterface {
    public async validate(games: GameDetailModel[], args?: ValidationArguments): Promise<boolean> {
        return Array.isArray(games) && games.reduce((a, b) => a && typeof b.requesterTeamMark === "string" && typeof b.requesterTeamName === "string" && typeof b.score === "string" && typeof b.sports === "string" && typeof b.writerTeamMark === "string" && typeof b.writerTeamName === "string", true)
    }
}

export default class TeamDto {
    constructor()
    constructor(data : RegisterTeamDto, teamCode : string, timeStamp : string)

    constructor(data? : RegisterTeamDto, teamCode? : string, timeStamp? : string) {
        if(data !== null && data !== undefined) {
            const user : RequesterDto = data.requester
            this.teamCode = teamCode
            this.teamName = data.teamName
            this.kindness = "0.0"
            this.tier = "Unknown"
            this.gameDetails = []
            this.teamMarkUrl = data.teamMarkUrl
            this.todayPlayedCount = 0
            this.todayMaxPlayedCount = 1
            this.createdAt = timeStamp
            this.writePostCode = null
            this.linkedChattingCode = null
            this.linkedPostCode = null
            this.linkedGameState = null
            this.point = 0
            this.gameRecords = "0:0:0"
            this.members = [{
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImageUrl: user.profileImageUrl,
                privateId: user.privateId,
                nickname: user.nickname,
            }]
            this.joinRequests = []
        }
    }

    @IsString()
    teamCode : string

    @IsString()
    teamName : string

    @IsString()
    kindness : string

    @IsString()
    tier : string

    @IsArray({
        each: true
    })
    @Validate(IsGameDetailArray, {
        message: "유효하지 않은 값 입니다."
    })
    gameDetails : GameDetailModel[]

    @IsString()
    teamMarkUrl : string

    @IsInt()
    @Min(0)
    @Max(3)
    todayPlayedCount : number

    @Min(1)
    @Max(3)
    @IsInt()
    todayMaxPlayedCount : number

    @IsString()
    createdAt : string

    writePostCode : string | null
    linkedChattingCode : string | null
    linkedPostCode : string | null
    linkedGameState : string | null

    @IsInt()
    point : number

    @IsString()
    gameRecords : string

    @IsNotEmpty()
    @IsArray({
        each: true
    })
    @Validate(IsMemberArray, {
        message: "유효하지 않은 값 입니다."
    })
    members : MemberModel[]

    @IsArray({
        each: true
    })
    @Validate(IsJoinRequestArray, {
        message: "유효하지 않은 값 입니다."
    })
    joinRequests : JoinRequestModel[]
}