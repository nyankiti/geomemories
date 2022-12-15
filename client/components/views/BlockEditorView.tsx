import React from 'react';
import dynamic from 'next/dynamic';
const BlockEditor = dynamic(() => import('components/templates/BlockEditor'), {
  ssr: false,
});

const BlockEditorView = () => {
  return (
    <div className="">
      <BlockEditor />
    </div>
  );
};

export default BlockEditorView;
