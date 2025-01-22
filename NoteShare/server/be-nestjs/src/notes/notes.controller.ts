import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async create(@Body() body: { content: string }, @Request() req) {
    return this.notesService.create(body.content, req.user.id);
  }

  @Get()
  async getAll(@Request() req) {
    return this.notesService.findByUser(req.user.id);
  }
}