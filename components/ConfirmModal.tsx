import React from 'react';

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius, Shadows } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

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
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onCancel} statusBarTranslucent>
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.cancelButton, { borderColor: colors.border }]} onPress={onCancel}>
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
  button: {
    alignItems: 'center',
    borderRadius: Radius.md,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  confirmButton: {
    // backgroundColor set in component
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalContainer: {
    borderRadius: Radius.lg,
    maxWidth: 320,
    padding: 24,
    width: '100%',
    ...Shadows.lg,
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});
