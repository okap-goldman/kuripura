import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaType } from '../entities/post.entity';

export class CreatePostDto {
  @ApiProperty({ description: '投稿内容' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: '投稿のキャプション' })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({ description: 'メディアタイプ', enum: ['image', 'text', 'audio', 'video'] })
  @IsEnum(['image', 'text', 'audio', 'video'])
  @IsNotEmpty()
  mediaType: MediaType;

  @ApiProperty({ description: '投稿者のID' })
  @IsString()
  @IsNotEmpty()
  authorId: string;
} 