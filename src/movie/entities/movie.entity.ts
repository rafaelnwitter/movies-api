import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Index('movie_publisherId_index')
  @ManyToOne(() => User, (publisher: User) => publisher.movies, {
    eager: false,
  })
  publisher: User;

  @RelationId((movie: Movie) => movie.publisher)
  publisherId: number;
}
