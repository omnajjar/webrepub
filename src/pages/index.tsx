import { useEffect, useState } from 'react';

import { WebRepubApp } from '@/desginer';
import { isMobileDevice, isSmallScreen } from '@/desginer/utils/screen';
import { LoadingView, SmallScreenView } from '@/desginer/Views';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setLoading(false);

    const checkIsDesktop = () =>
      setIsDesktop(!isMobileDevice() && !isSmallScreen());

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  if (loading) {
    return <LoadingView></LoadingView>;
  }

  if (isDesktop) {
    return <WebRepubApp />;
  }

  return <SmallScreenView />;
}
