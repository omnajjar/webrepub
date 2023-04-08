import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { WebrepubPreset } from '@/desginer/types/webrepub';
import { ensure } from '@/utils';

interface WebrepubConfigurations {
  settings: {
    isInDesignMode: boolean;
  };
  presets: {
    collection: WebrepubPreset[];
    currentPreset?: WebrepubPreset;
  };
}

const noop = () => {
  /* do nothing */
};

const defaultWebrepubConfigurations: WebrepubConfigurations = {
  settings: {
    isInDesignMode: true,
  },
  presets: {
    collection: [],
  },
};

interface WebrepubConfigurationsContextProps {
  settings: WebrepubConfigurations['settings'];
  presets: WebrepubConfigurations['presets'];
  setSettings: (settings: Partial<WebrepubConfigurations['settings']>) => void;
  setCurrentPreset: (presetName: string) => void;
}

const WebrepubContext = createContext<WebrepubConfigurationsContextProps>({
  ...defaultWebrepubConfigurations,
  setSettings: noop,
  setCurrentPreset: noop,
});

interface GlobalSettingsProviderProps extends PropsWithChildren {
  settings: WebrepubConfigurations['settings'];
  presets: WebrepubConfigurations['presets'];
}

export function WebrepubProvider({
  children,
  settings,
  presets,
}: GlobalSettingsProviderProps) {
  const [globalSettings, setGlobalSettings] = useState(settings);
  const [presetsValue, setPresetsValue] = useState(presets);

  const value: WebrepubConfigurationsContextProps = {
    settings: globalSettings,
    setSettings: (settings) => {
      setGlobalSettings({
        ...globalSettings,
        ...settings,
      });
    },
    presets: {
      collection: presetsValue.collection,
      currentPreset: presetsValue.currentPreset,
    },
    setCurrentPreset: (presetName: string) => {
      setPresetsValue({
        ...presetsValue,
        currentPreset: ensure(
          presetsValue.collection.find((p) => p.name === presetName)
        ),
      });
    },
  };

  return (
    <WebrepubContext.Provider value={value}>
      {children}
    </WebrepubContext.Provider>
  );
}

export function useWebrepub() {
  return useContext(WebrepubContext);
}
