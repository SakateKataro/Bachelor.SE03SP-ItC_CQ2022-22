import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  async create(content: string, userId: number): Promise<Note> {
    const note = this.noteRepository.create({ content, userId });
    return this.noteRepository.save(note);
  }

  async findByUser(userId: number): Promise<Note[]> {
    return this.noteRepository.find({ where: { userId } });
  }
}