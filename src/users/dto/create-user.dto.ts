import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  role:string

}

