import { IsString } from 'class-validator'

export default class RoomModel {
    @IsString()
    private_roomId : string

    roomId : number
}