import { StyleColorsProps } from '@/types';
import { StyleSheet } from 'react-native';

import { useThemedColors } from './use-theme';

type WithColors<P> = P & StyleColorsProps;

export const useGetStyles = <
  P extends object = Record<string, never>,
  S extends StyleSheet.NamedStyles<S> = StyleSheet.NamedStyles<any>,
>(
  fn: (props: WithColors<P>) => S,
  props?: P
): S => {
  const colors = useThemedColors();
  return StyleSheet.create(
    fn({
      ...(props ?? ({} as P)),
      colors,
    })
  );
};
