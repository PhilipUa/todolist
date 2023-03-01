import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.input';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User as IUser } from '@prisma/client';
import { User } from '../common/decorators/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.auth.createUser(data);
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.auth.login(email, password);
  }

  @Post('refresh-token')
  refreshToken(@Body() { token }: RefreshTokenDto) {
    return this.auth.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  me(@User() user: IUser) {
    return user;
  }
}
