import { useInfiniteQuery, useQuery } from "react-query"
import { TeamApi } from "../api/team"
import { DEFAULT_PAGE_SIZE } from "../helpers/constants"
import { PlayerApi } from "../api/player"

export const useTeamList = (filter) => {
  return useInfiniteQuery(
    ['teamList', filter],
    async ({ pageParam }) => {
      return TeamApi.list({
        ...filter,
        page: pageParam ?? 1,
        perPage: DEFAULT_PAGE_SIZE
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.length < DEFAULT_PAGE_SIZE) return undefined
        return allPages.length + 1;
      },
      retry: 1
    }
  )
}

export const useAllTeams = () =>
  useQuery(['teamList', 'all'], () => TeamApi.list({ page: 1, perPage: 99999 }));

export const useTeamDetail = (teamId) =>
  useQuery(['retrieveTeam', teamId], () => {
    if (!teamId) return undefined;
    return TeamApi.retrieve(teamId);
  }, {
    enabled: !!teamId
  })


export const usePlayerList = (filter) => {
  return useInfiniteQuery(
    ['playerList', filter],
    async ({ pageParam }) => {
      return PlayerApi.list({
        ...filter,
        page: pageParam ?? 1,
        perPage: DEFAULT_PAGE_SIZE
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.length < DEFAULT_PAGE_SIZE) return undefined
        return allPages.length + 1;
      },
      retry: 1
    }
  )
}


export const usePlayerDetail = (playerId) =>
  useQuery(['retrievePlayer', playerId.toString()], () => {
    if (!playerId) return undefined;
    return PlayerApi.retrieve(playerId);
  }, {
    enabled: !!playerId
  })

