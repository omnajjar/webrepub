import { Col, Divider, Row, Stack } from 'rsuite';

import { Logo } from '@/desginer/Components';
import { PresetList } from '@/desginer/Components/PresetList';

export default function HomePage() {
  return (
    <Row gutter={5}>
      <Col xsHidden smHidden lg={4} md={4}></Col>
      <Col xs={24} sm={24} lg={16} md={16}>
        <Stack direction='column' alignItems='center' justifyContent='center'>
          <Stack.Item>
            <Logo scale={4}></Logo>
          </Stack.Item>
          <Stack.Item>
            <h4 className='text-center'>Presets</h4>
            <p className='text-center'>select a preset</p>
          </Stack.Item>
          <Stack.Item alignSelf='stretch'>
            <Divider></Divider>
            <PresetList />
          </Stack.Item>
        </Stack>
      </Col>
      <Col xsHidden smHidden lg={4} md={4}></Col>
    </Row>
  );
}
