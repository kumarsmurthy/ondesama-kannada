import { videos } from './youtube-videos.reducer';
import { YoutubeVideosActions } from './youtube-videos.actions';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Youtube Videos reducer', () => {
  const mockedState = [];
  const youtubeVideosActions = new YoutubeVideosActions();
  const createStateMock = (results = []) => {
    return Object.assign({ query: '', isSearching: false}, {
      results
    });
  };

  it('should return current state when no valid actions have been made', () => {
    const state = createStateMock([...mockedState]);
    const actual = videos(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toBe(expected);
  });

  it('should ADD videos', () => {
    const state = createStateMock([...mockedState]);
    const actual = videos(state, youtubeVideosActions.addVideos(<any>YoutubeMediaItemsMock));
    const expected = [...state.results, ...YoutubeMediaItemsMock];
    expect(actual.results.length).toBe(expected.length);
  });

  it('should empty the state when RESET', () => {
    const state = createStateMock([...YoutubeMediaItemsMock]);
    const actual = videos(state, { type: YoutubeVideosActions.RESET });
    const expected = 0;
    expect(actual.results.length).toEqual(expected);
  });

  it('should replace 50 objects when updating data when state is not empty', () => {
    const state = createStateMock([...YoutubeMediaItemsMock, ...YoutubeMediaItemsMock]);
    const actual = videos(state, {
      type: YoutubeVideosActions.UPDATE_METADATA,
      payload: YoutubeMediaItemsMock
    });
    const expected = state.results.length;
    expect(actual.results.length).toBe(expected);
  });
});
