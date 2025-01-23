import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  async create(content: string, userId: number, file?: string): Promise<Note> {
    const note = this.noteRepository.create({ content, userId, file });
    return this.noteRepository.save(note);
  }

  async findByUser(userId: number): Promise<Note[]> {
    return this.noteRepository.find({ where: { userId } });
  }

  async findById(noteId: number, userId: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id: noteId, userId } });
    if (!note) {
      throw new NotFoundException('Note not found or not accessible');
    }
    return note;
  }
}