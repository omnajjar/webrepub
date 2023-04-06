import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Col, Grid, Row } from 'rsuite';

import { PresetCard } from '@/desginer/Components/PresetCard';
import { useWebrepub } from '@/desginer/Providers/webrepub';

export function PresetList() {
  const {
    presets: { collection },
    setCurrentPreset,
  } = useWebrepub();
  const router = useRouter();

  const handlePresetClick = useCallback(
    (presetName: string) => {
      setCurrentPreset(presetName);
      router.push('/editor');
    },
    [router, setCurrentPreset]
  );

  return (
    <Grid fluid>
      <Row gutter={16}>
        {collection.map(({ name }) => (
          <Col lg={8} md={8} sm={24} xs={24} key={name} className='mb-20'>
            <PresetCard name={name} onClick={() => handlePresetClick(name)} />
          </Col>
        ))}
      </Row>
    </Grid>
  );
}
