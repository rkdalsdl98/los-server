import { IsString } from "class-validator";
import TeamDto from "./team.dto";

export default class RegistResDto {
    readonly team : TeamDto | null
    
    @IsString()
    message : string | null

    @IsString()
    exception : string | null
}