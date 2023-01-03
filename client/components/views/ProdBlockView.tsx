import React from 'react';
import { Album } from 'entities/album';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

// ブロックのタイプごとにコンポーネントを管理するオブジェクト
const renderer = {
  paragraph: '',
  image: '',
  header: '',
  list: '',
  geom: '',
};

type Props = {
  album: Album;
};

const ProdBlockView = ({ album }: Props) => {
  // global state
  return (
    <div className="my-12 flex flex-col items-center">
      <h1>{album.title}</h1>
      <p className="p-1">
        {album.startDateString != album.endDateString
          ? album.startDateString + '~' + album.endDateString
          : album.startDateString}
      </p>
      <ul className="flex items-center p-4">
        <li className="px-[6px]">
          <a
            href="javascript:void(0)"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowLeft size={32} />
          </a>
        </li>
        <li className="px-[6px]">
          <a
            href="javascript:void(0)"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            1
          </a>
        </li>
        <li className="px-[6px]">
          <a
            href="javascript:void(0)"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            2
          </a>
        </li>
        <li className="px-[6px]">
          <a
            href="javascript:void(0)"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            3
          </a>
        </li>
        <li className="px-[6px]">
          <a
            href="javascript:void(0)"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowRight size={32} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProdBlockView;
