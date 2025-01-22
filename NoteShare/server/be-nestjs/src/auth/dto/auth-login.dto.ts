import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  name: string;

  @IsNotEmpty()
  password: string;
}
