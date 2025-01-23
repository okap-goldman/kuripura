import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserProfileRequest } from '@kuripura/shared';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() updateData: UpdateUserProfileRequest,
  ) {
    return this.usersService.updateProfile(req.user.id, updateData);
  }

  @Delete('profile')
  async deleteProfile(@Request() req) {
    await this.usersService.remove(req.user.id);
    return { message: 'Profile deleted successfully' };
  }
} 