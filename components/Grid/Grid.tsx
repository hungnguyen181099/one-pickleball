import { createContext, useContext } from 'react';
import { DimensionValue, StyleProp, View, ViewStyle } from 'react-native';

type GridContextType = {
  columns: number;
  gap: number;
};

type GridProps = {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
};

type GridItemProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const GridContext = createContext<GridContextType | null>(null);

export const Grid = ({ columns = 1, gap = 0, style, children }: GridProps) => {
  return (
    <GridContext.Provider value={{ columns, gap }}>
      <View
        style={[
          {
            marginHorizontal: -gap,
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
          style,
        ]}
      >
        {children}
      </View>
    </GridContext.Provider>
  );
};

export const GridItem = ({ children, style }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error('Grid.Item must be used inside <Grid> component');
  }

  const padding = context.gap;
  const width = `${100 / context.columns}%` as DimensionValue;

  return <View style={[{ width, padding }, style]}>{children}</View>;
};
