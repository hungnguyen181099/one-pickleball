import { FinalMatchState, MatchEvent, MatchState } from '@/types';

import { fetchWrapper } from '@/utils/fetch.utils';

import { API_ENDPOINTS } from '../constants';

interface SyncEventsResponse {
  success: boolean;
  message?: string;
}

interface EndMatchResponse {
  success: boolean;
  message?: string;
}

interface GetStateResponse {
  success: boolean;
  data?: MatchState;
  message?: string;
}

export async function syncEventsToServer(
  matchId: string,
  events: MatchEvent[],
  matchState: MatchState
): Promise<SyncEventsResponse> {
  return fetchWrapper<SyncEventsResponse>(`/referee/matches/${matchId}/sync-events`, {
    method: 'POST',
    body: JSON.stringify({
      events,
      match_state: matchState,
    }),
  });
}

export async function endMatchAPI(matchId: string, finalState: FinalMatchState): Promise<EndMatchResponse> {
  console.log('finalState', finalState);

  return fetchWrapper<EndMatchResponse>(`/api/referee/matches/${matchId}/end`, {
    method: 'POST',
    body: JSON.stringify(finalState),
  });

  // try {
  //   const response = await fetch(API_ENDPOINTS.endMatch, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify(finalState),
  //   });

  //   if (!response.ok) {
  //     throw new Error('End match failed');
  //   }

  //   const data = await response.json();
  //   return { success: true, ...data };
  // } catch (error) {
  //   console.error('End match failed:', error);
  //   return {
  //     success: false,
  //     message: error instanceof Error ? error.message : 'Unknown error',
  //   };
  // }
}

export async function getMatchState(): Promise<GetStateResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.getState, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Get state failed');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Get state failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function navigateBack(): void {
  // In a real app, this would use React Navigation or similar
  console.log('Navigate to:', API_ENDPOINTS.backUrl);
}
