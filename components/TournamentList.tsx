import tournamentService from "@/services/api/tournament.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { TournamentCardSkeleton } from "./ui/Skeleton";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./ui/Text";
import TournamentCard from "./TournamentCard";
import { Pagination } from "./ui/Pagination";
import { TournamentStatus } from "@/types";

export const TournamentList = ({ status }: { status: TournamentStatus | undefined }) => {
  const [page, setPage] = useState(1);
  // Reset page when status changes
  React.useEffect(() => {
    setPage(1);
  }, [status]);

  const { data, status: queryStatus } = useQuery({
    queryKey: ['getTournaments', status, page],
    queryFn: () =>
      tournamentService.getTournaments({
        status: status, // undefined will fetch all
        page: page,
      }),
  });

  if (queryStatus === 'pending') {
    return (
      <View style={{ gap: 16 }}>
        <TournamentCardSkeleton />
        <TournamentCardSkeleton />
      </View>
    );
  }

  if (queryStatus === 'error') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#64748b' }}>Không thể tải danh sách giải đấu</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data?.data || []}
      renderItem={({ item }) => <TournamentCard tournament={item} />}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', padding: 32 }}>
          <Text style={{ color: '#94a3b8' }}>Không có giải đấu nào</Text>
        </View>
      }
      ListFooterComponent={
        data?.data && data.data.length > 0 ? (
          <Pagination
            currentPage={data.meta.current_page}
            totalPages={data.meta.last_page}
            onPageChange={setPage}
          />
        ) : null
      }
    />
  );
};