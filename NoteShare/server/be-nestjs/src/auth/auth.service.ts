import { Injectable,ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async register(name: string, password: string): Promise<User> { 
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // Check if user exists
      const existingUser = await queryRunner.manager.findOne(User, {
        where: { name }
      });
      
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ name, password: hashedPassword });
      const savedUser = await queryRunner.manager.save(user);

    await queryRunner.commitTransaction();
      return savedUser;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async validateUser(name: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { name } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  generateToken(userId: number): string {
    return this.jwtService.sign({ id: userId });
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}