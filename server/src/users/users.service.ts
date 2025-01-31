import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  RegisterCredentials,
  UpdateUserProfileRequest,
  FileUploadResponse,
} from '@kuripura/shared';
import { WasabiService } from './services/wasabi.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly wasabiService: WasabiService,
  ) { }

  async create(credentials: RegisterCredentials): Promise<User> {
    const existingUser = await this.findByEmail(credentials.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.email = credentials.email;
    user.password = credentials.password;
    user.name = credentials.name;
    user.isEmailVerified = false;

    return this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updateProfile(
    id: string,
    updateData: UpdateUserProfileRequest,
  ): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async uploadProfileImage(
    userId: string,
    file: Express.Multer.File,
  ): Promise<FileUploadResponse> {
    if (!file) {
      throw new BadRequestException('画像ファイルが必要です');
    }

    const user = await this.findOne(userId);
    
    const imageUrl = await this.wasabiService.uploadProfileImage(
      file.buffer,
      `profile-${userId}-${Date.now()}.${file.originalname.split('.').pop()}`,
    );

    user.avatar = imageUrl;
    await this.usersRepository.save(user);

    return { url: imageUrl };
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    const user = await this.findOne(id);
    user.refreshToken = refreshToken;
    await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
} 