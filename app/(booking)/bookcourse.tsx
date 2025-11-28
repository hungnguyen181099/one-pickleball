import { styles } from '@/constants/styles/booking.styles';
import { AppColors } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface DateOption {
    id: string;
    day: string;
    number: number;
    month: string;
    isToday?: boolean;
}

interface TimeSlot {
    id: string;
    time: string;
    price: string;
    available: boolean;
    popular?: boolean;
}

interface CourtOption {
    id: string;
    name: string;
    description: string;
    available: boolean;
}

export default function BookingCourse() {
    const colors = useThemedColors();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('1');
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [selectedCourt, setSelectedCourt] = useState('1');
    const [notes, setNotes] = useState('');


    const generateDates = (): DateOption[] => {
        const dates: DateOption[] = [];
        const today = new Date();
        const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        for (let i = 0; i < 11; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayOfWeek = date.getDay();
            const dayNumber = date.getDate();
            const month = date.getMonth() + 1;

            dates.push({
                id: String(i + 1),
                day: dayNames[dayOfWeek],
                number: dayNumber,
                month: `Th${month}`,
                isToday: i === 0
            });
        }

        return dates;
    };

    const dates: DateOption[] = generateDates();

    const morningSlots: TimeSlot[] = [
        { id: '06:00', time: '06:00', price: '200k', available: true },
        { id: '07:00', time: '07:00', price: '200k', available: true },
        { id: '08:00', time: '08:00', price: '200k', available: true },
        { id: '09:00', time: '09:00', price: '200k', available: true },
        { id: '10:00', time: '10:00', price: '200k', available: true },
        { id: '11:00', time: '11:00', price: '200k', available: true },
    ];

    const afternoonSlots: TimeSlot[] = [
        { id: '12:00', time: '12:00', price: '220k', available: true },
        { id: '13:00', time: '13:00', price: '220k', available: true },
        { id: '14:00', time: '14:00', price: '220k', available: true },
        { id: '15:00', time: '15:00', price: '250k', available: true },
        { id: '16:00', time: '16:00', price: '250k', available: true },
        { id: '17:00', time: '17:00', price: '280k', available: true },
    ];

    const eveningSlots: TimeSlot[] = [
        { id: '18:00', time: '18:00', price: '300k', available: true, popular: true },
        { id: '19:00', time: '19:00', price: '300k', available: true, popular: true },
        { id: '20:00', time: '20:00', price: '280k', available: true },
        { id: '21:00', time: '21:00', price: '250k', available: true },
        { id: '22:00', time: '22:00', price: '220k', available: true },
    ];

    const courts: CourtOption[] = [
        { id: '1', name: 'Sân 1', description: 'Indoor • AC', available: true },
        { id: '2', name: 'Sân 2', description: 'Indoor • AC', available: true },
        { id: '3', name: 'Sân 3', description: 'Indoor • AC • VIP', available: true },
    ];

    const btnHandle = () => {
        
        const selectedDateObj = dates.find(d => d.id === selectedDate);
        if (!selectedDateObj) return;

        
        const allSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];
        let totalPrice = 0;
        selectedTimes.forEach(time => {
            const slot = allSlots.find(s => s.time === time);
            if (slot) {
                const priceStr = slot.price.replace('k', '');
                const priceNumber = parseFloat(priceStr) * 1000;
                totalPrice += priceNumber;
            }
        });

        
        const dateStr = `${selectedDateObj.number}/${selectedDateObj.month.replace('Th', '')}`;
        const sortedTimes = [...selectedTimes].sort();
        const startTime = sortedTimes[0];
        const lastTime = sortedTimes[sortedTimes.length - 1];
        const [hour, minute] = lastTime.split(':').map(Number);
        const endHour = hour + 1;
        const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const timeRange = `${startTime} - ${endTimeStr}`;

        
        const selectedCourtObj = courts.find(c => c.id === selectedCourt);

        router.push({
            pathname: '/checkout',
            params: {
                courtName: 'Sân Pickleball Rạch Chiếc',
                location: 'Quận 2, TP.HCM',
                date: dateStr,
                timeRange: timeRange,
                selectedTimes: JSON.stringify(selectedTimes),
                court: selectedCourtObj?.name || '',
                courtDescription: selectedCourtObj?.description || '',
                notes: notes,
                totalPrice: totalPrice.toString(),
            }
        })
    }

    const ProgressSteps = () => (
        <View style={[styles.progressContainer, { borderBottomColor: colors.border, backgroundColor: colors.background }]}>
            <View style={styles.progressStep}>
                <View style={[styles.stepNumber, currentStep >= 1 ? styles.stepNumberCompleted : styles.stepNumberInactive]}>
                    <Text style={[styles.stepNumberText, { color: currentStep >= 1 ? '#fff' : colors.textTertiary }]}>
                        1
                    </Text>
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 1 ? colors.text : colors.textTertiary }]}>
                    Chọn giờ
                </Text>
            </View>

            <View style={[styles.progressLine, currentStep >= 2 ? styles.progressLineActive : styles.progressLineInactive]} />

            <View style={styles.progressStep}>
                <View style={[styles.stepNumber, currentStep >= 2 ? styles.stepNumberActive : styles.stepNumberInactive]}>
                    <Text style={[styles.stepNumberText, { color: currentStep >= 2 ? '#fff' : colors.textTertiary }]}>
                        2
                    </Text>
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 2 ? colors.text : colors.textTertiary }]}>
                    Xác nhận
                </Text>
            </View>

            <View style={[styles.progressLine, currentStep >= 3 ? styles.progressLineActive : styles.progressLineInactive]} />

            <View style={styles.progressStep}>
                <View style={[styles.stepNumber, currentStep >= 3 ? styles.stepNumberActive : styles.stepNumberInactive]}>
                    <Text style={[styles.stepNumberText, { color: currentStep >= 3 ? '#fff' : colors.textTertiary }]}>
                        3
                    </Text>
                </View>
                <Text style={[styles.stepLabel, { color: currentStep >= 3 ? colors.text : colors.textTertiary }]}>
                    Thanh toán
                </Text>
            </View>
        </View>
    );

    const DateCard = ({ date }: { date: DateOption }) => (
        <TouchableOpacity
            onPress={() => setSelectedDate(date.id)}
            style={styles.dateCards}>
            <View
                style={[
                    styles.dateCard,
                    { backgroundColor: colors.input },
                    selectedDate === date.id ? styles.dateCardActive : styles.dateCardInactive,
                ]}
            >
                <Text style={[styles.dateNumber, { color: selectedDate === date.id ? '#fff' : colors.text }]}>
                    {date.number}
                </Text>

            </View>
            <Text style={[styles.dateDay, { color: selectedDate === date.id ? AppColors.primary : colors.textSecondary }]}>
                {date.isToday ? 'Hôm nay' : date.day}
            </Text>
        </TouchableOpacity>
    );

    const TimeSlotButton = ({ slot }: { slot: TimeSlot }) => {
        const isSelected = selectedTimes.includes(slot.time);
        const isTimeSlotPassed = (): boolean => {
            if (selectedDate !== '1') return false;

            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const [slotHour, slotMinute] = slot.time.split(':').map(Number);

            if (slotHour < currentHour) return true;
            if (slotHour === currentHour && slotMinute <= currentMinute) return true;
            return false;
        };

        const isPassed = isTimeSlotPassed();
        const isAvailable = slot.available && !isPassed;

        const handlePress = () => {
            if (!isAvailable) return;

            if (isSelected) {
                setSelectedTimes(selectedTimes.filter(time => time !== slot.time));
            } else {
                setSelectedTimes([...selectedTimes, slot.time].sort());
            }
        };

        return (
            <TouchableOpacity
                style={[
                    styles.timeSlot,
                    !isAvailable && styles.timeSlotUnavailable,
                    isSelected && isAvailable && styles.timeSlotActive,
                    isAvailable && !isSelected && styles.timeSlotInactive,
                    slot.popular && !isSelected && styles.timeSlotPopular,
                ]}
                onPress={handlePress}
                disabled={!isAvailable}
            >
                <Text style={[styles.timeText, { color: isSelected ? '#fff' : colors.text }]}>
                    {slot.time}
                </Text>
                <Text style={[styles.timePrice, { color: isSelected ? '#fff' : colors.textSecondary }]}>
                    {slot.price}
                </Text>
                {slot.popular && !isSelected && (
                    <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>Hot</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const CourtOptionCard = ({ court }: { court: CourtOption }) => (
        <TouchableOpacity
            style={[
                styles.courtOption,
                selectedCourt === court.id ? styles.courtOptionActive : styles.courtOptionInactive,
            ]}
            onPress={() => setSelectedCourt(court.id)}
        >
            <View style={[styles.courtOptionCard, { backgroundColor: colors.card }]}>
                <View style={styles.courtOptionInfo}>
                    <Text style={[styles.courtOptionName, { color: colors.text }]}>
                        {court.name}
                    </Text>
                    <Text style={[styles.courtOptionDesc, { color: colors.textSecondary }]}>
                        {court.description}
                    </Text>
                </View>
                <View style={[styles.courtOptionStatus, styles.courtOptionStatusAvailable]}>
                    <Text style={styles.courtOptionStatusText}>Còn trống</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.icon} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Đặt sân</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="ellipsis-vertical" size={24} color={colors.icon} />
                </TouchableOpacity>
            </View>


            <ProgressSteps />


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={[styles.courtSummary, { borderBottomColor: colors.border }]}>
                    <LinearGradient
                        colors={['#00D9B5', '#0099CC']}
                        style={styles.courtSummaryImage}
                    />
                    <View style={styles.courtSummaryInfo}>
                        <Text style={[styles.courtSummaryName, { color: colors.text }]}>
                            Sân Pickleball Rạch Chiếc
                        </Text>
                        <View style={styles.courtSummaryMeta}>
                            <Ionicons name="location-outline" size={16} color={colors.icon} />
                            <Text style={[styles.courtSummaryMetaText, { color: colors.textSecondary }]}>
                                Quận 2, TP.HCM
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Chọn ngày</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.dateSelector}>
                            {dates.map((date) => (
                                <DateCard key={date.id} date={date} />
                            ))}
                        </View>
                    </ScrollView>
                </View>


                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Chọn giờ</Text>

                    <View style={styles.timePeriod}>
                        <Text style={[styles.timePeriodTitle, { color: colors.text }]}>Buổi sáng</Text>
                        <View style={styles.timeSlots}>
                            {morningSlots.map((slot) => (
                                <TimeSlotButton key={slot.id} slot={slot} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.timePeriod}>
                        <Text style={[styles.timePeriodTitle, { color: colors.text }]}>Buổi chiều</Text>
                        <View style={styles.timeSlots}>
                            {afternoonSlots.map((slot) => (
                                <TimeSlotButton key={slot.id} slot={slot} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.timePeriod}>
                        <Text style={[styles.timePeriodTitle, { color: colors.text }]}>Buổi tối</Text>
                        <View style={styles.timeSlots}>
                            {eveningSlots.map((slot) => (
                                <TimeSlotButton key={slot.id} slot={slot} />
                            ))}
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Chọn sân</Text>
                    <View style={styles.courtSelector}>
                        {courts.map((court) => (
                            <CourtOptionCard key={court.id} court={court} />
                        ))}
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Ghi chú</Text>
                    <TextInput
                        style={[
                            styles.notesInput,
                            {
                                backgroundColor: colors.input,
                                borderColor: colors.inputBorder,
                                color: colors.text,
                            }
                        ]}
                        placeholder="Thêm ghi chú cho đơn đặt sân (không bắt buộc)"
                        placeholderTextColor={colors.textTertiary}
                        multiline
                        numberOfLines={3}
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>
            </ScrollView>


            <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
                <View style={styles.bookingSummary}>
                    <View style={styles.summaryItem}>
                        <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Ngày giờ:</Text>
                        <Text style={[styles.summaryValue, { color: colors.text }]}>
                            {(() => {
                                const selectedDateObj = dates.find(d => d.id === selectedDate);
                                if (!selectedDateObj || selectedTimes.length === 0) return 'Chưa chọn';

                                const dateStr = `${selectedDateObj.number}/${selectedDateObj.month.replace('Th', '')}`;
                                const sortedTimes = [...selectedTimes].sort();
                                const startTime = sortedTimes[0];
                                const lastTime = sortedTimes[sortedTimes.length - 1];
                                const [hour, minute] = lastTime.split(':').map(Number);
                                const endHour = hour + 1;
                                const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

                                return `${dateStr}, ${startTime} - ${endTimeStr}`;
                            })()}
                        </Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tổng tiền:</Text>
                        <Text style={styles.priceHighlight}>
                            {(() => {
                                if (selectedTimes.length === 0) return '0đ';

                                const allSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];
                                let totalPrice = 0;
                                selectedTimes.forEach(time => {
                                    const slot = allSlots.find(s => s.time === time);
                                    if (slot) {
                                        const priceStr = slot.price.replace('k', '');
                                        const priceNumber = parseFloat(priceStr) * 1000;
                                        totalPrice += priceNumber;
                                    }
                                });

                                return totalPrice.toLocaleString('vi-VN') + 'đ';
                            })()}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                        styles.continueBtn,
                        (!selectedDate || selectedTimes.length === 0 || !selectedCourt) && { opacity: 0.5 }
                    ]}
                    onPress={btnHandle}
                    disabled={!selectedDate || selectedTimes.length === 0 || !selectedCourt}
                >
                    <Text style={styles.continueBtnText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}