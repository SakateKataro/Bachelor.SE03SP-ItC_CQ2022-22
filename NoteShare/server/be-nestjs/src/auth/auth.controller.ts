import { Controller, Post, Body, UnauthorizedException, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { name: string; password: string }) {
    const user = await this.authService.register(body.name, body.password);
    return { id: user.id, name: user.name };
  }

  @Post('login')
  async login(@Body() body: { name: string; password: string }) {
    const user = await this.authService.validateUser(body.name, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token: this.authService.generateToken(user.id) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}