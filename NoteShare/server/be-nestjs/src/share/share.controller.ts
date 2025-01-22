import { Controller, Post, Param, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ShareService } from './share.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('share')
@UseGuards(JwtAuthGuard)
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Post(':noteId')
  async createShare(
    @Param('noteId') noteId: number,
    @Body() body: { expiresIn: number },
    @Request() req,
  ) {
    return this.shareService.create(noteId, req.user.id, body.expiresIn);
  }

  @Get(':token')
  async validateShare(@Param('token') token: string) {
    return this.shareService.validate(token);
  }
}