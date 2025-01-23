import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '新しい投稿を作成' })
  @ApiResponse({ status: 201, description: '投稿が作成されました' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: '全ての投稿を取得' })
  @ApiResponse({ status: 200, description: '投稿一覧を返却' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '指定されたIDの投稿を取得' })
  @ApiResponse({ status: 200, description: '投稿を返却' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '投稿を更新' })
  @ApiResponse({ status: 200, description: '投稿が更新されました' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '投稿を削除' })
  @ApiResponse({ status: 200, description: '投稿が削除されました' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: '指定されたユーザーの投稿を取得' })
  @ApiResponse({ status: 200, description: 'ユーザーの投稿一覧を返却' })
  findByAuthorId(@Param('authorId') authorId: string) {
    return this.postsService.findByAuthorId(authorId);
  }
} 