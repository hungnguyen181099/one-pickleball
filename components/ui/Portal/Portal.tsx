import React, { PropsWithChildren, ReactNode, createContext, useCallback, useContext, useRef, useState } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types
interface PortalContextValue {
  addPortal: (component: ReactNode) => string;
  removePortal: (key: string) => void;
  updatePortal: (key: string, component: ReactNode) => void;
}

interface PortalMap {
  [key: string]: ReactNode;
}

interface PortalProps {
  children: ReactNode;
}

// Context for managing portals
const PortalContext = createContext<PortalContextValue | null>(null);

// Provider component that manages all portals
export const PortalProvider = ({ children }: PropsWithChildren) => {
  const [portals, setPortals] = useState<PortalMap>({});
  const nextKey = useRef<number>(0);
  const edgeInsets = useSafeAreaInsets();

  const addPortal = useCallback((component: ReactNode): string => {
    const key = `portal-${nextKey.current++}`;
    setPortals((prev) => ({ ...prev, [key]: component }));
    return key;
  }, []);

  const removePortal = useCallback((key: string): void => {
    setPortals((prev) => {
      const newPortals = { ...prev };
      delete newPortals[key];
      return newPortals;
    });
  }, []);

  const updatePortal = useCallback((key: string, component: ReactNode): void => {
    setPortals((prev) => ({ ...prev, [key]: component }));
  }, []);

  return (
    <PortalContext.Provider value={{ addPortal, removePortal, updatePortal }}>
      <View style={styles.container}>
        {children}

        <View
          style={[styles.portalHost, { marginTop: edgeInsets.top, marginBottom: edgeInsets.bottom }]}
          pointerEvents="box-none"
        >
          {Object.entries(portals).map(([key, component]) => (
            <View key={key} style={StyleSheet.absoluteFill} pointerEvents="box-none">
              {component}
            </View>
          ))}
        </View>
      </View>
    </PortalContext.Provider>
  );
};

// Portal component that renders its children at the top level
export const Portal = ({ children }: PortalProps) => {
  const context = useContext(PortalContext);
  const keyRef = useRef<string | null>(null);

  React.useEffect(() => {
    if (!context) {
      console.warn('Portal used outside of PortalProvider');
      return;
    }

    keyRef.current = context.addPortal(children);

    return () => {
      if (keyRef.current) {
        context.removePortal(keyRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (context && keyRef.current) {
      context.updatePortal(keyRef.current, children);
    }
  }, [children]);

  return null;
};

// Hook to access portal context
export function usePortal(): PortalContextValue {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  portalHost: {
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
});
