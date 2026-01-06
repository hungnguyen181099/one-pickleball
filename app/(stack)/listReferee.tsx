import { ScreenContainer } from '@/components/common/ScreenContainer'
import { ScreenHeader } from '@/components/common/ScreenHeader'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import { Flex } from '@/components/ui/Flex'
import { Grid, GridItem } from '@/components/ui/Grid'
import { Pagination } from '@/components/ui/Pagination'
import { Select } from '@/components/ui/Select'
import { Space } from '@/components/ui/Space'
import { Text } from '@/components/ui/Text'
import { useThemedColors } from '@/hooks/use-theme'
import { dayjsExt } from '@/lib/days'
import refereeService from '@/services/api/referee.service'
import { formatDate } from '@/utils/date.utils'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'

const filter = [
    { label: "Tất cả", value: '' },
    { label: "Hủy", value: 'cancelled' },
    { label: "Sẵn sàng", value: 'ready' },
    { label: "Hoãn lại", value: 'postponed' },
    { label: "Đang diễn ra", value: 'in_progress' },
    { label: "Đã lên lịch", value: 'scheduled' },
    { label: "Đã hoàn thành", value: 'completed' },
]


export default function ListReferee() {
    const [thao, setThao] = useState('')
    const [tournamenntId, setTournamenntId] = useState<string | null>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [dateTo, setDateTo] = useState<Date | null>(null)
    const [page, setPage] = useState<number>(1)
    const colors = useThemedColors();
    const { data, isPending, refetch, isRefetching } = useQuery({
        queryKey: ['getReferees', thao, tournamenntId, date, dateTo, page],
        queryFn: () =>
            refereeService.getReferees({
                status: thao,
                tournament_id: tournamenntId || '',
                date_from: date ? dayjsExt(date).format('YYYY-MM-DD') : '',
                date_to: dateTo ? dayjsExt(dateTo).format('YYYY-MM-DD') : '',
                page: page
            }),
    });

    const getReferees = data?.data.matches.data

    const filters = [{ label: 'Tất cả', value: '' },
    ...(data?.data.tournaments.map(item => ({ label: item.name, value: String(item.id) })) || [])

    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in_progress': return 'info';
            case 'scheduled': return 'warning';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            case 'ready': return 'primary';
            case 'postponed': return 'secondary';
            default: return 'muted';
        }
    }

    return (
        <ScreenContainer>
            <ScreenHeader withBorder={false} title='Danh sách trận đấu' />
            <View style={{ paddingHorizontal: 16, gap: 8, borderBottomWidth: 1, borderColor: colors.border, paddingBottom: 16 }}>
                <View>
                    <Select value={tournamenntId} onChangeValue={setTournamenntId} options={filters} placeholder='Chọn giải đấu' />
                    <Space />
                    <Grid gap={4} columns={2}>
                        <GridItem>
                            <DateTimePicker value={date} onDateChange={setDate} />
                        </GridItem>
                        <GridItem>
                            <DateTimePicker value={dateTo} onDateChange={setDateTo} />
                        </GridItem>
                    </Grid>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    gap: 8,
                }}>
                    {filter.map((item, index) => (
                        <Chip
                            variant='filled'
                            checked={item.value === thao}
                            onPress={() => {
                                setThao(item.value)
                            }}
                            size="sm"
                            key={index}
                        >
                            {item.label}
                        </Chip>
                    ))}
                </ScrollView>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 12 }}>
                {!isPending && getReferees?.map(item => {
                    const isMatchStarted = item.status === 'in_progress';
                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.7}
                            onPress={() => {
                                router.push({
                                    pathname: '/(stack)/referee',
                                    params: { id: item.id }
                                })
                            }}
                        >
                            <Card padding={0}>
                                {/* Header Status */}
                                <Flex justifyContent="space-between" alignItems="flex-start" style={{ padding: 16, paddingBottom: 12 }}>
                                    <View style={{ flex: 1 }}>
                                        <Flex gap={6} alignItems="center">
                                            <Badge variant="light" color={getStatusColor(item.status)} size="sm">
                                                {filter.find(i => i.value === item.status)?.label}
                                            </Badge>
                                            <Text size="xs" color="muted" numberOfLines={1}>
                                                {item.tournament?.name}
                                            </Text>
                                        </Flex>
                                        <Text size="lg" fontWeight={800} style={{ marginTop: 8, letterSpacing: -0.5, color: colors.text }}>
                                            Mã trận: #{item.match_number}
                                        </Text>
                                    </View>
                                </Flex>

                                {/* Scores Section */}
                                <View style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                    backgroundColor: colors.secondary,
                                    marginHorizontal: 16,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: colors.borderSecondary
                                }}>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text fontWeight={600} numberOfLines={2} textAlign="center" style={{ marginBottom: 8, height: 40, textAlignVertical: 'center', color: colors.text }}>
                                                {item.athlete1_name}
                                            </Text>
                                            <Text style={{ fontSize: 32, fontWeight: '800', color: isMatchStarted ? colors.text : colors.textTertiary }}>
                                                {item.athlete1_score ?? 0}
                                            </Text>
                                        </View>

                                        <View style={{ width: 40, alignItems: 'center', marginHorizontal: 8 }}>
                                            <View style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 16,
                                                backgroundColor: colors.border, // Using border color for the VS circle background for subtle contrast
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Text color="muted" fontWeight={900} size="xs">VS</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text fontWeight={600} numberOfLines={2} textAlign="center" style={{ marginBottom: 8, height: 40, textAlignVertical: 'center', color: colors.text }}>
                                                {item.athlete2_name}
                                            </Text>
                                            <Text style={{ fontSize: 32, fontWeight: '800', color: isMatchStarted ? colors.text : colors.textTertiary }}>
                                                {item.athlete2_score ?? 0}
                                            </Text>
                                        </View>
                                    </Flex>
                                </View>

                                {/* Footer */}
                                <View style={{ padding: 16 }}>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Flex gap={6} alignItems="center">
                                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.textTertiary }} />
                                            <Text size="xs" color="muted" fontWeight={500}>
                                                {formatDate(item.match_date)}
                                                {item.match_time ? ` • ${item.match_time}` : ''}
                                            </Text>
                                        </Flex>
                                        {isMatchStarted ? (
                                            <Flex gap={4} alignItems="center">
                                                <Text size="xs" color="primary" fontWeight={700}>
                                                    {filter.find(i => i.value === item.status)?.label}
                                                </Text>
                                                <Text size="xs" color="primary" fontWeight={700}>
                                                    {'>'}
                                                </Text>
                                            </Flex>
                                        ) : (
                                            <Text size="xs" color="muted" fontWeight={500}>
                                                {filter.find(i => i.value === item.status)?.label}
                                            </Text>
                                        )}
                                    </Flex>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                })}
                {data &&
                    <Pagination currentPage={data.data.matches.current_page || 1} totalPages={data.data.matches.last_page || 1} onPageChange={setPage} />}
            </ScrollView>
        </ScreenContainer>
    )
}
