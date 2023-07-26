import { IsString } from 'class-validator'

export default class NotifyDto {
    @IsString()
    type : string

    data : any
}