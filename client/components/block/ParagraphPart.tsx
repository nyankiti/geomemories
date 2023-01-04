import React from 'react';
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  block: OutputBlockData;
};
const ParagraphPart = ({ block }: Props) => {
  const text = block.data.text.replace(/<br>/g, '\n');
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default ParagraphPart;
