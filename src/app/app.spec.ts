
import {
  inject,
  TestBed
} from '@angular/core/testing';

import { App } from './app.component';
import { YoutubeSearch, YoutubePlayerService, NowPlaylistService } from './core/services';
import { Store } from '@ngrx/store';

xdescribe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', [ 'dispatch', 'subscribe', 'select' ]);
    const nowPlaylistServiceSpy = jasmine.createSpyObj('NowPlaylistService', ['updateIndexByMedia']);

    return TestBed.configureTestingModule({
      providers: [
        App,
        { provide: YoutubeSearch, useClass: class YoutubeSearch {} },
        { provide: YoutubePlayerService, userClass: class YoutubePlayerService {} },
        { provide: NowPlaylistService, useValue: nowPlaylistServiceSpy },
        // { provide: Store, useValue: storeSpy }
      ]});
  });

  it('should be defined', inject([ App ], (app) => {
    expect(app).toBeDefined();
  }));

  it('should have 3 public services', inject([ App ], (app) => {
    const expectedServices = [
      'youtubeSearch',
      'playerService',
      'nowPlaylistService'
    ];
    expectedServices.forEach(service => expect(app[service]).toBeDefined());
  }));

  it('should select a video in playlist', inject([ App ], (app) => {
    const media = { id: 'mocked-media-object' };
    const expected = media.id;
    const actual = app.nowPlaylistService.updateIndexByMedia;
    app.selectVideo(media);
    expect(actual).toHaveBeenCalledWith(expected);
  }));
});
