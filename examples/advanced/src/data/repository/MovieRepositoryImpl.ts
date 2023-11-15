import {MovieRepository} from '../../domain/repository/MovieRepository';
import MovieUserDataSource from '../datasource/MovieUserDataSource';
import {DrmMovie} from '../../domain/model/DrmMovie';

export class MovieRepositoryImpl implements MovieRepository {
    dataSource: MovieUserDataSource;
    constructor(_datasource: MovieUserDataSource) {
        this.dataSource = _datasource;
    }

    async getDrmMovies(): Promise<DrmMovie[]> {
        return this.dataSource.getDrmMovieModels();
    }
}
