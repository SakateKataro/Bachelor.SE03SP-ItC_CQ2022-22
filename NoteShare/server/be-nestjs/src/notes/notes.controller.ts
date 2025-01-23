import { Controller, Post, Get, Body, Request, UseGuards, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() body: { content: string },
    @UploadedFile() file: Multer.File,
    @Request() req,
  ) {
    const filePath = file ? file.path : undefined;
    return this.notesService.create(body.content, req.user.id, filePath);
  }

  @Get()
  async getAll(@Request() req) {
    return this.notesService.findByUser(req.user.id);
  }

  @Get(':id')
  async getNoteById(@Param('id') id: number, @Request() req) {
    return this.notesService.findById(id, req.user.id);
  }
}