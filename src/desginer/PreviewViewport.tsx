import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { TiArrowBack } from 'react-icons/ti';
import styled from 'styled-components';

import { EditorContext } from '@/desginer/EditorContext';
import { PreviewFrame } from '@/desginer/frames/PreviewFrame';

const FloatingButton = styled.button`
  position: fixed;
  width: 50px;
  height: 50px;
  top: 45%;
  right: 20px;
  background-color: #191b1a;
  color: #fff;
  font-size: 28px;
  padding: 5px;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  opacity: 0.4;
  transition: all 0.2s linear;
  z-index: 99999;

  &:hover {
    opacity: 1;
  }
`;

function GoHomeButton() {
  const router = useRouter();

  const goHome = () => router.push('/editor');

  return (
    <FloatingButton onClick={goHome}>
      <TiArrowBack style={{ marginTop: '5px' }} />
    </FloatingButton>
  );
}

export function PreviewViewport() {
  const [documentReady, setDocumentReady] = useState(false);
  useEffect(() => {
    setDocumentReady(true);
  }, []);
  return (
    <>
      <EditorContext enabled={false}>
        <PreviewFrame></PreviewFrame>
      </EditorContext>
      {documentReady
        ? ReactDOM.createPortal(<GoHomeButton />, document.body)
        : null}
    </>
  );
}
