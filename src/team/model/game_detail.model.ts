import { IsString } from "class-validator";

export default class GameDetailModel {
    @IsString()
    writerTeamMark : string

    @IsString()
    requesterTeamMark : string

    @IsString()
    score : string

    @IsString()
    writerTeamName : string

    @IsString()
    requesterTeamName : string

    @IsString()
    sports : string
}