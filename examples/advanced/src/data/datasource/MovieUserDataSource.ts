import {DrmMovieModel} from '../model/DrmMovieModel';
import contentJson from '../../../assets/UserContent.json';
import {Platform} from 'react-native';

export default interface MovieUserDataSource {
    getDrmMovieModels(): Promise<DrmMovieModel[]>;
}

export default class MovieUserDataSourceImpl implements MovieUserDataSource {
    async getDrmMovieModels(): Promise<DrmMovieModel[]> {
        return contentJson.data
            .filter(item => {
                if (Platform.OS == 'ios') {
                    return item.url.includes('m3u8');
                } else {
                    return item.url.includes('mpd');
                }
            })
            .map((item) => ({
                url: item.url,
                contentId: item.content_id,
                title: item.title,
                token: item.token,
                licenseUrl: item.licenseUrl,
                licenseCipherTablePath : item.licenseCipherTablePath,
                certificateUrl: item.certificateUrl,
                downloadState: '',
            }));
    }
}
