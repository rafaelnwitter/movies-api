import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import MovieNotFoundException from '../exceptions/movieNotFound.exception';
import { options } from 'joi';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async createMovie(movie: CreateMovieDto, user: User) {
    const newMovie = await this.moviesRepository.create({
      ...movie,
      publisher: user,
    });
    await this.moviesRepository.save(newMovie);
    return newMovie;
  }

  async updateMovie(id: number, movie: UpdateMovieDto) {
    await this.moviesRepository.update(id, movie);
    const updatedMovie = await this.moviesRepository.findOne(
      options(id, 'publisher'),
    );
    if (updatedMovie) {
      return updatedMovie;
    }
    throw new MovieNotFoundException(id);
  }

  async deleteMovie(id: number) {
    const deleteResponse = await this.moviesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new MovieNotFoundException(id);
    }
  }

  getMovie(id: number) {
    return this.moviesRepository.findOneByOrFail({ id: id });
  }
}
