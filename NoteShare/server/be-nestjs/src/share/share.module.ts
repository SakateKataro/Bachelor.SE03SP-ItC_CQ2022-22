import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { Share } from './entities/share.entity';
import { NotesModule } from '../notes/notes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Share]), NotesModule],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}