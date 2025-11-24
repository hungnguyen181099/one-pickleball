import { styles } from '@/assets/styles/booking.styles';
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
    const [currentStep, setCurrentStep] = useState(2);
    const [selectedDate, setSelectedDate] = useState('2');
    const [selectedTime, setSelectedTime] = useState('15:00');
    const [selectedDuration, setSelectedDuration] = useState('1.5');
    const [selectedCourt, setSelectedCourt] = useState('2');
    const [notes, setNotes] = useState('');

    const dates: DateOption[] = [
        { id: '1', day: 'T2', number: 18, month: 'Th11' },
        { id: '2', day: 'T3', number: 19, month: 'Th11', isToday: true },
        { id: '3', day: 'T4', number: 20, month: 'Th11' },
        { id: '4', day: 'T5', number: 21, month: 'Th11' },
        { id: '5', day: 'T6', number: 22, month: 'Th11' },
        { id: '6', day: 'T7', number: 23, month: 'Th11' },
    ];

    const morningSlots: TimeSlot[] = [
        { id: '06:00', time: '06:00', price: '200k', available: false },
        { id: '07:00', time: '07:00', price: '200k', available: false },
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

    const durations = [
        { id: '1', label: '1 giờ' },
        { id: '1.5', label: '1.5 giờ' },
        { id: '2', label: '2 giờ' },
        { id: '3', label: '3 giờ' },
    ];

    const courts: CourtOption[] = [
        { id: '1', name: 'Sân 1', description: 'Indoor • AC', available: true },
        { id: '2', name: 'Sân 2', description: 'Indoor • AC', available: true },
        { id: '3', name: 'Sân 3', description: 'Indoor • AC • VIP', available: true },
    ];

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
            style={[
                styles.dateCard,
                selectedDate === date.id ? styles.dateCardActive : styles.dateCardInactive,
                { borderColor: selectedDate === date.id ? undefined : colors.border }
            ]}
            onPress={() => setSelectedDate(date.id)}
        >
            <Text style={[styles.dateDay, { color: selectedDate === date.id ? '#fff' : colors.textSecondary }]}>
                {date.day}
            </Text>
            <Text style={[styles.dateNumber, { color: selectedDate === date.id ? '#fff' : colors.text }]}>
                {date.number}
            </Text>
            <Text style={[styles.dateMonth, { color: selectedDate === date.id ? '#fff' : colors.textSecondary }]}>
                {date.month}
            </Text>
            {date.isToday && (
                <View style={styles.dateBadge}>
                    <Text style={styles.dateBadgeText}>Hôm nay</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const TimeSlotButton = ({ slot }: { slot: TimeSlot }) => (
        <TouchableOpacity
            style={[
                styles.timeSlot,
                !slot.available && styles.timeSlotUnavailable,
                selectedTime === slot.time && slot.available && styles.timeSlotActive,
                slot.available && selectedTime !== slot.time && styles.timeSlotInactive,
                slot.popular && selectedTime !== slot.time && styles.timeSlotPopular,
                { borderColor: selectedTime === slot.time ? undefined : colors.border }
            ]}
            onPress={() => slot.available && setSelectedTime(slot.time)}
            disabled={!slot.available}
        >
            <Text style={[styles.timeText, { color: selectedTime === slot.time ? '#fff' : colors.text }]}>
                {slot.time}
            </Text>
            <Text style={[styles.timePrice, { color: selectedTime === slot.time ? '#fff' : colors.textSecondary }]}>
                {slot.price}
            </Text>
            {slot.popular && selectedTime !== slot.time && (
                <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>Hot</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const DurationButton = ({ duration }: { duration: { id: string; label: string } }) => (
        <TouchableOpacity
            style={[
                styles.durationBtn,
                selectedDuration === duration.id ? styles.durationBtnActive : styles.durationBtnInactive,
                { borderColor: selectedDuration === duration.id ? undefined : colors.border }
            ]}
            onPress={() => setSelectedDuration(duration.id)}
        >
            <Text style={[styles.durationBtnText, { color: selectedDuration === duration.id ? '#fff' : colors.text }]}>
                {duration.label}
            </Text>
        </TouchableOpacity>
    );

    const CourtOptionCard = ({ court }: { court: CourtOption }) => (
        <TouchableOpacity
            style={[
                styles.courtOption,
                selectedCourt === court.id ? styles.courtOptionActive : styles.courtOptionInactive,
                { borderColor: selectedCourt === court.id ? undefined : colors.border }
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

                {/* Duration */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Thời lượng</Text>
                    <View style={styles.durationSelector}>
                        {durations.map((duration) => (
                            <DurationButton key={duration.id} duration={duration} />
                        ))}
                    </View>
                </View>

                {/* Court Selection */}
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
                        <Text style={[styles.summaryValue, { color: colors.text }]}>19/11, 15:00 - 16:30</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tổng tiền:</Text>
                        <Text style={styles.priceHighlight}>375.000đ</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.continueBtn} onPress={() => setCurrentStep(3)}>
                    <Text style={styles.continueBtnText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}