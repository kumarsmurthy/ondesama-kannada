import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { YoutubeApiFactory, YoutubeApiService } from './youtube-api.service';

@Injectable()
export class YoutubeSearch {
  url: string = 'https://www.googleapis.com/youtube/v3/search';
  api: YoutubeApiService;
  isSearching: Boolean = false;

  constructor(private http: Http, apiFactory: YoutubeApiFactory) {
    this.api = apiFactory.create();
    this.api.setOptions({
      url: this.url,
      http: http,
      config: {
        part: 'snippet,id',
        q: '',
        type: 'video'
      }
    });
  }

  search(query: string) {
    this.api.config.set('q', query);
    this.isSearching = true;
    return this.api.list('video')
      .map((response: any) => {
        this.isSearching = false;
        return response.items;
      });
  }

  searchMore() {
    if (!this.isSearching) {
      return this.api.setNextPageToken();
    }
  }

  resetPageToken () {
    this.api.resetPageToken();
  }

  isNewSearchQuery (query: string) {
    return query !== this.api.config.get('q');
  }
}
