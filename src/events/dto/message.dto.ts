import { IsString } from "class-validator";

export default class MessageDto {
    @IsString()
    text: string

    @IsString()
    roomId: string
}