// DEPENDENCIES
import { IsNotEmpty, IsDate, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDate()
  date_of_birth: Date;

  @IsPhoneNumber('BR')
  phone: string;

  @IsEmail()
  email: string;
}
