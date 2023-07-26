import { IsString } from "class-validator";

export default class JoinRequestModel {
    @IsString()
    privateId : string

    @IsString()
    nickName : string

    @IsString()
    age : string

    @IsString()
    height : string

    @IsString()
    weight : string

    @IsString()
    profileImageUrl : string

    detailInfo : DetailInfoModel | null
}

class DetailInfoModel {
    @IsString()
    name : string

    @IsString()
    phoneNumber : string

    @IsString()
    address : string

    @IsString()
    favoriteSports : string
}