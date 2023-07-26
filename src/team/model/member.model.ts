import { IsString } from "class-validator";

export default class MemberModel {
    @IsString()
    email : string

    @IsString()
    phoneNumber : string

    @IsString()
    profileImageUrl : string

    @IsString()
    privateId : string

    @IsString()
    nickname : string
}