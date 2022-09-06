import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { Movie } from './entities/movie.entity';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/authentication/interface/requestWithUser.interface';

@Controller('movie')
@ApiTags('movies')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthenticationGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A post has been successfully fetched',
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  @UseGuards(JwtAuthenticationGuard)
  getMovieById(@Param('id') id: string): Promise<Movie> {
    const movieId = Number(id);
    return this.movieService.getMovie(movieId);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createMovie(@Body() post: CreateMovieDto, @Req() req: RequestWithUser) {
    return this.movieService.createMovie(post, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateMovie(@Param('id') id: string, @Body() movie: UpdateMovieDto) {
    return this.movieService.updateMovie(Number(id), movie);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(Number(id));
  }
}
