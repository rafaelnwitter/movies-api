import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger';
import { LocalAuthenticationGuard } from '../authentication/guards/localAuthentication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse()
  @ApiConflictResponse()
  @UseGuards(LocalAuthenticationGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
