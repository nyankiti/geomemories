import React from 'react';
import clsx from 'clsx';
import { OutputBlockData } from '@editorjs/editorjs';

const textSizeMapping = {
  1: 'text-3xl',
  2: 'text-2xl',
  3: 'text-xl',
  4: 'text-lg',
  5: 'text-md',
  6: 'text-base',
};

type Props = {
  block: OutputBlockData;
};

const HeaderPart = ({ block }: Props) => {
  const text = block.data.text as string;
  const level = block.data.level as 1 | 2 | 3 | 4 | 5 | 6;
  return <p className={clsx(textSizeMapping[level], 'p-1')}>{text}</p>;
};

export default HeaderPart;
