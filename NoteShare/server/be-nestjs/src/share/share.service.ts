import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Share } from './entities/share.entity';
import { NotesService } from '../notes/notes.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share) private shareRepository: Repository<Share>,
    private notesService: NotesService,
    private jwtService: JwtService,
  ) {}

  async create(noteId: number, userId: number, expiresIn: number): Promise<string> {
    const note = await this.notesService.findById(noteId, userId);

    const token = this.jwtService.sign(
      { noteId, userId },
      { expiresIn },
    );

    const share = this.shareRepository.create({
      token,
      noteId,
      userId,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
    });

    await this.shareRepository.save(share);
    return token;
  }

  async validate(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      const share = await this.shareRepository.findOne({ where: { token } });

      if (!share || new Date() > share.expiresAt) {
        throw new NotFoundException('Invalid or expired share link');
      }

      return payload;
    } catch (error) {
      throw new NotFoundException('Invalid or expired token');
    }
  }
}