import { Observable } from 'rxjs/Rx';
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { YoutubeSearch } from '../services/youtube.search';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';
import { YoutubeVideosEffects } from './youtube-videos.effects';
import { YoutubeVideosActions } from '../store/youtube-videos';

describe('Youtube Videos Effect', () => {
  let runner: EffectsRunner;
  let youtubeVideosEffects: YoutubeVideosEffects;
  let isNewSearchQuery: boolean = true;
  let videosStateMock = {
    query: ''
  };

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('storeSpy', [
      'dispatch', 'subscribe'
    ]);
    storeSpy.select = () => Observable.of(videosStateMock);
    const youtubeSearchSpy = jasmine.createSpyObj('youtubeSearchSpy', [
      'resetPageToken', 'search', 'searchMore'
    ]);
    youtubeSearchSpy.isNewSearchQuery = () => isNewSearchQuery;
    const youtubeVideosInfoSpy = jasmine.createSpyObj('youtubeVideosInfoSpy', [
      'fetchVideoData'
    ]);
    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule
      ],
      providers: [
        YoutubeVideosEffects,
        { provide: Store, useValue: storeSpy },
        { provide: YoutubeSearch, useValue: youtubeSearchSpy },
        { provide: YoutubeVideosInfo, useValue: youtubeVideosInfoSpy },
        YoutubeVideosActions
      ]
    });
  });

  beforeEach(inject([
      EffectsRunner, YoutubeVideosEffects
    ],
    (_runner, _youtubeVideosEffects) => {
      runner = _runner;
      youtubeVideosEffects = _youtubeVideosEffects;
    }
  ));

  it('should reset when searching new videos', () => {
    const action = {
      type: YoutubeVideosActions.SEARCH_NEW_QUERY,
      payload: 'testing'
    };
    const expected = {
      type: YoutubeVideosActions.RESET
    };
    runner.queue(action);

    youtubeVideosEffects.resetVideos$.subscribe(result => {
      expect(result).toEqual(expected);
    });
  });

  it('should reset page token when searching new videos', inject(
    [ YoutubeSearch ],
    (youtubeSearchSpy) => {
      const action = {
        type: YoutubeVideosActions.SEARCH_NEW_QUERY,
        payload: 'testing'
      };
      runner.queue(action);
      youtubeVideosEffects.resetVideos$.subscribe(result => {
        expect(youtubeSearchSpy.resetPageToken).toHaveBeenCalled();
      });
    }));

  it('should dispatch a search start action when searching new query', inject(
    [ YoutubeVideosActions ],
    (youtubeVideosActions: YoutubeVideosActions) => {
    const action = youtubeVideosActions.searchNewQuery('guitar tracks');
    const expected = youtubeVideosActions.searchStart(action.payload);
    runner.queue(action);
    youtubeVideosEffects.startSearch$.subscribe(result => {
      expect(result).toEqual(expected);
    });
  }));

  it('should start search with the existing query when searching more', () => {
    const action = {
      type: YoutubeVideosActions.SEARCH_MORE
    };
    videosStateMock.query = 'ambient music';
    const expected = {
      type: YoutubeVideosActions.SEARCH_START,
      payload: videosStateMock.query
    };
    runner.queue(action);
    youtubeVideosEffects.searchMoreVideos$.subscribe(result => {
      expect(result).toEqual(expected);
    });
  });
});
