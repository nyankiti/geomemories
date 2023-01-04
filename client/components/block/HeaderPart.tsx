import React from 'react';
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  block: OutputBlockData<string, any>;
};
const HeaderPart = ({ block }: Props) => {
  return <div>HeaderPart</div>;
};

export default HeaderPart;
