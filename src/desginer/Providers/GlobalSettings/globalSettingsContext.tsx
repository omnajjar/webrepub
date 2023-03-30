import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface GlobalSettings {
  isInDesignMode: boolean;
}

interface GlobalSettingsContextProps {
  settings: GlobalSettings;
  setSettings: (settings: Partial<GlobalSettings>) => void;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextProps>({
  settings: {
    isInDesignMode: true,
  },
  setSettings: () => {
    /* noop */
  },
});

interface GlobalSettingsProviderProps extends PropsWithChildren {
  settings: GlobalSettings;
}

export function GlobalSettingsProvider({
  children,
  settings,
}: GlobalSettingsProviderProps) {
  const [globalSettings, setGlobalSettings] = useState(settings);

  const value: GlobalSettingsContextProps = {
    settings: globalSettings,
    setSettings: (settings) => {
      setGlobalSettings({
        ...globalSettings,
        ...settings,
      });
    },
  };

  return (
    <GlobalSettingsContext.Provider value={value}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  return useContext(GlobalSettingsContext);
}
