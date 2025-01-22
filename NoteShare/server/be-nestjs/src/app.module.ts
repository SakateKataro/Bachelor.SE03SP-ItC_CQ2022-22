import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Để sử dụng biến môi trường từ .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'll25062004',
      database: 'lab2',
      autoLoadEntities: true,
      synchronize: true, // Không nên bật ở môi trường production
    }),
    AuthModule,
    NotesModule,
  ],
})
export class AppModule {}