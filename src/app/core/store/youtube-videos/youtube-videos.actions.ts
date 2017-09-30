import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export function ActionCreator<T>(options = { action: '' }): PropertyDecorator {
  return function (target: any, key: string) {
    target[key] = (p) => ({
      type: options.action,
      payload: p || undefined
    });
  };
}
@Injectable()
export class YoutubeVideosActions {
  static ADD = '[YoutubeVideos] ADD_VIDEOS';
  static REMOVE = '[YoutubeVideos] REMOVE';
  static RESET = '[YoutubeVideos] RESET';
  static UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA';
  static SEARCH_NEW_QUERY = '[YoutubeVideos] SEARCH_NEW_QUERY';
  static SEARCH_ENDED_SUCCESS = '[YoutubeVideos] SEARCH_ENDED_SUCCESS';
  static SEARCH_START = '[YoutubeVideos] SEARCH_START';
  static SEARCH_MORE = '[YoutubeVideos] SEARCH_MORE';
  static SEARCH_PRESET = '[YoutubeVideos] SEARCH_PRESET';

  addVideos(videos: GoogleApiYouTubeVideoResource[]): Action {
    return {
      type: YoutubeVideosActions.ADD,
      payload: videos
    };
  }

  removeVideo(): Action {
    return {
      type: YoutubeVideosActions.REMOVE
    };
  }

  reset(): Action {
    return {
      type: YoutubeVideosActions.RESET
    };
  }

  updateMetaData(videos): Action {
    return {
      type: YoutubeVideosActions.UPDATE_METADATA,
      payload: videos
    };
  }

  searchNewQuery(query: string): Action {
    return {
      type: YoutubeVideosActions.SEARCH_NEW_QUERY,
      payload: query
    };
  }

  searchEndedSuccess(items: GoogleApiYouTubeSearchResource[]): Action {
    return {
      type: YoutubeVideosActions.SEARCH_ENDED_SUCCESS,
      payload: items
    };
  }

  searchStart(query: string): Action {
    return {
      type: YoutubeVideosActions.SEARCH_START,
      payload: query
    };
  }

  searchMore(): Action {
    return {
      type: YoutubeVideosActions.SEARCH_MORE
    };
  }

  updatePreset(preset: string): Action {
    return {
      type: YoutubeVideosActions.SEARCH_PRESET,
      payload: preset
    };
  }
}
