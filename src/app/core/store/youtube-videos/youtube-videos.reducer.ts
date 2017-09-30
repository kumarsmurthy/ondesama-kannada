import { ActionReducer, Action } from '@ngrx/store';
import { YoutubeVideosActions } from './youtube-videos.actions';
export type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | Object;

export interface EchoesVideos {
  results: GoogleApiYoutubeVideo[];
  query: string;
  preset: string;
  isSearching: boolean;
}

let initialState: EchoesVideos = {
  results: [],
  query: '',
  preset: '',
  isSearching: false
};

export const videos: ActionReducer<EchoesVideos> = (
  state: EchoesVideos = initialState,
  action: Action
  ) => {

  switch (action.type) {
    case YoutubeVideosActions.ADD:
    return Object.assign({}, state, {
      results: [...state.results, ...action.payload]
    });

    case YoutubeVideosActions.REMOVE:
    return state;

    case YoutubeVideosActions.RESET:
    return Object.assign({}, state, { results: [] });

    case YoutubeVideosActions.SEARCH_START:
    return Object.assign({}, state, {
      isSearching: true
    });

    case YoutubeVideosActions.SEARCH_ENDED_SUCCESS:
    return Object.assign({}, state, {
      isSearching: false
    });

    case YoutubeVideosActions.SEARCH_NEW_QUERY:
    return Object.assign({}, state, {
      query: action.payload
    });

    case YoutubeVideosActions.SEARCH_PRESET:
    return Object.assign({}, state, {
      preset: action.payload
    });

    default:
      return state;
  }
};
