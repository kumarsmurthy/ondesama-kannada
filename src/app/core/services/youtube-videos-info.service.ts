import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { YoutubeApiFactory, YoutubeApiService } from './youtube-api.service';

@Injectable()
export class YoutubeVideosInfo {
  private api: YoutubeApiService;

  constructor(private http: Http, private apiFactory: YoutubeApiFactory) {
    this.api = apiFactory.create();
    this.api.setOptions({
      url: 'https://www.googleapis.com/youtube/v3/videos',
      http: this.http,
      idKey: 'id',
      config: {
        part: 'snippet,contentDetails,statistics'
      }
    });
  }

  fetchVideoData (mediaId: string) {
    return this.api
      .list(mediaId)
      .map(response => response.items);
  }
}
