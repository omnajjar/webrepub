import { useEffect, useState } from 'react';

import { PreviewViewport } from '@/desginer/PreviewViewport';
import { LoadingView } from '@/desginer/Views';

export default function Preview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingView></LoadingView>;
  }

  return <PreviewViewport></PreviewViewport>;
}
