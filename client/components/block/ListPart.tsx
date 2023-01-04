import React from 'react';
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  block: OutputBlockData<string, any>;
};
const ListPart = ({ block }: Props) => {
  return <div>ListPart</div>;
};

export default ListPart;
