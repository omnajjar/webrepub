import { CSSProperties } from 'react';
import { BsCircleFill } from 'react-icons/bs';

const colorIconStyle: CSSProperties = {
  fontSize: '20px',
  marginTop: '5px',
  border: '1px solid black',
  borderRadius: '100%',
};

export function ColorIndicator({ color }: { color: string }) {
  return (
    <BsCircleFill
      style={{
        ...colorIconStyle,
        color,
      }}
    ></BsCircleFill>
  );
}
