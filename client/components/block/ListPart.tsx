import React from 'react';
import clsx from 'clsx';
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  block: OutputBlockData;
};
const ListPart = ({ block }: Props) => {
  const items = block.data.items as string[];
  return (
    <ul
      className={clsx(
        'm-1',
        block.data.style == 'ordered' ? 'list-decimal' : 'list-disc',
      )}
    >
      {items.map((text, i) => (
        <li key={i} className="p-[2px]">
          {text.replace('<br>', '')}
        </li>
      ))}
    </ul>
  );
};

export default ListPart;
