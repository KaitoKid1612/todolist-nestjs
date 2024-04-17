import { IsBoolean, IsDate, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    date: Date;

    @IsBoolean()
    done: boolean;
}
