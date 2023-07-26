import { IsString } from 'class-validator'
import RequesterDto from './requester.dto'

export default class RegisterTeamDto {
    requester : RequesterDto

    @IsString()
    teamName : string

    @IsString()
    teamMarkUrl : string
}