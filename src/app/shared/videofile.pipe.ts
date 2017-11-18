import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'videofile' })
export class VideofilePipe implements PipeTransform {

    private videoExts = [
        'aac',
        'asf',
        'avi',
        'dv',
        'divx',
        'flac',
        'flc',
        'flv',
        'mkv',
        'mpeg',
        'mpeg4',
        'mpegts',
        'mpg4',
        'mp3',
        'mp4',
        'mpg',
        'mkv',
        'mov',
        'm4v',
        'ogg',
        'ogm',
        'ogv',
        'oga',
        'ogx',
        'qt',
        'rm',
        'swf',
        'ts',
        'vob',
        'wmv',
        'wav',
        'webm'
    ];

    transform(files: object[]): object[] {
        const self = this;
        const length = this.videoExts.length;
        return files.filter(function(file) {
            for (let i = 0; i < length; i++) {
                if (file['name'].endsWith('.' + self.videoExts[i])) {
                    return true;
                }
            }
            return false;
        });
    }
}
