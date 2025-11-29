import { AppColors, Radius, Shadows } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({
    visible,
    title,
    message,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    const colors = useThemedColors();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
            statusBarTranslucent
        >
            <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
                            onPress={onCancel}
                        >
                            <Text style={[styles.buttonText, { color: colors.text }]}>{cancelText}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.confirmButton, { backgroundColor: AppColors.primary }]}
                            onPress={onConfirm}
                        >
                            <Text style={[styles.buttonText, { color: '#fff' }]}>{confirmText}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 320,
        borderRadius: Radius.lg,
        padding: 24,
        ...Shadows.lg,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    confirmButton: {
        // backgroundColor set in component
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
