import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from '../../common/validation/unique-email.validator';
import { Transform } from 'class-transformer';

export class SignupDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Unique()
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'password123',
    description: 'The password for the user',
  })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    required: false,
  })
  firstname?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: false,
  })
  lastname?: string;
}
