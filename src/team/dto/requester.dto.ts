import { IsString } from "class-validator"

export default class RequesterDto {
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