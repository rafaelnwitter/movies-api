import MovieSearchBody from './movieSearchBody.interface';

interface MovieSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: MovieSearchBody;
    }>;
  };
}

export default MovieSearchResult;
