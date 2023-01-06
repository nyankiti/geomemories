import React from 'react';
import Image from 'next/image';
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  block: OutputBlockData;
};
const ImagePart = ({ block }: Props) => {
  return (
    <div className="m-2 flex items-center justify-center">
      <Image
        className="rounded-md"
        src={block.data.file.url}
        alt="image"
        width={300}
        height={300}
      />
    </div>
  );
};

export default ImagePart;
