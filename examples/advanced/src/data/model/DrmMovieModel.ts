import { DrmMovie } from '../../domain/model/DrmMovie';

export class DrmMovieModel implements DrmMovie {
    url = '';
    contentId = '';
    title = '';
    token = '';
    licenseUrl = 'https://license-global.pallycon.com/ri/licenseManager.do/';
    licenseCipherTablePath = '';
    certificateUrl = '';
    downloadState = '';
}
