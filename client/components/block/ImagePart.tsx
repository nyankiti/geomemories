import React from 'react';
import Image from 'next/image';
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  block: OutputBlockData<string, any>;
};
const ImagePart = ({ block }: Props) => {
  return (
    <div>
      <Image src={block.data.file.url} alt="image" width={300} height={300} />
    </div>
  );
};

export default ImagePart;
