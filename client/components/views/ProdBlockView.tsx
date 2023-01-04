/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from 'react';
import { Album } from 'entities/album';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
/* components */
import ParagraphPart from 'components/block/ParagraphPart';
import ImagePart from 'components/block/ImagePart';
import GeomPart from 'components/block/GeomPart';
import ListPart from 'components/block/ListPart';
import HeaderPart from 'components/block/HeaderPart';
/* types */
import { OutputBlockData } from '@editorjs/editorjs';
import clsx from 'clsx';

// ブロックのタイプごとにコンポーネントを管理するオブジェクト
const renderer: {
  [key: string]: (block: OutputBlockData<string, any>) => ReactNode;
} = {
  paragraph: (block: OutputBlockData<string, any>) => (
    <ParagraphPart block={block} />
  ),
  image: (block: OutputBlockData<string, any>) => <ImagePart block={block} />,
  header: (block: OutputBlockData<string, any>) => <HeaderPart block={block} />,
  list: (block: OutputBlockData<string, any>) => <ListPart block={block} />,
  geom: (block: OutputBlockData<string, any>) => <GeomPart block={block} />,
};

type Props = {
  album: Album;
};

const ProdBlockView = ({ album }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="my-12 flex flex-col items-center">
      <h1>{album.title}</h1>
      <p className="p-1">
        {album.startDateString != album.endDateString
          ? album.startDateString + '~' + album.endDateString
          : album.startDateString}
      </p>
      <div>
        {renderer[album.data[currentPage].type](album.data[currentPage])}
      </div>
      <ul className="flex items-center p-4">
        <li className="px-[6px]">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowLeft size={32} />
          </button>
        </li>
        {album.data.map((_, i) => {
          return (
            <li key={i} className="px-[6px]">
              <button
                onClick={() => setCurrentPage(i)}
                className={clsx(
                  'flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base hover:opacity-50',
                  currentPage == i
                    ? 'bg-blue-50 text-blue-500'
                    : 'text-[#838995]',
                )}
              >
                {i + 1}
              </button>
            </li>
          );
        })}

        <li className="px-[6px]">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(album.data.length - 1, prev + 1),
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowRight size={32} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProdBlockView;
