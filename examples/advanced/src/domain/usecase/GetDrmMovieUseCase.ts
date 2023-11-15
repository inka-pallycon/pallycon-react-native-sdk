import {DrmMovie} from '../model/DrmMovie';
import {MovieRepository} from '../repository/MovieRepository';

export interface GetDrmMovieUseCase {
    invoke: () => Promise<DrmMovie[]>
}

export class GetDrmMovies implements GetDrmMovieUseCase {
    private movieRepository: MovieRepository;
    constructor(_movieRepository: MovieRepository) {
        this.movieRepository = _movieRepository;
    }

    async invoke() {
        return this.movieRepository.getDrmMovies();
    }
}
