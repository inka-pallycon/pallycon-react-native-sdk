import {DrmMovie} from '../model/DrmMovie';

export interface MovieRepository {
    getDrmMovies(): Promise<DrmMovie[]>;
}
