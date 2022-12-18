import React from 'react';
import dynamic from 'next/dynamic';
const BlockEditor = dynamic(() => import('components/templates/BlockEditor'), {
  ssr: false,
});

const BlockEditorView = () => {
  return (
    <div className="">
      <div className="p-2 text-center">
        <p className="text-lg">
          地図アルバムを作ろう(
          <a className="cursor-pointer text-blue-400 hover:underline">
            作り方はこちら→
          </a>
          )
        </p>
      </div>
      <BlockEditor />
    </div>
  );
};

export default BlockEditorView;
