/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, ReactNode, useState } from 'react';
import Link from 'next/link';
import { Album } from 'entities/album';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
/* components */
import ParagraphPart from 'components/block/ParagraphPart';
import ImagePart from 'components/block/ImagePart';
import GeomPart from 'components/block/GeomPart';
import ListPart from 'components/block/ListPart';
import HeaderPart from 'components/block/HeaderPart';
import Pagination from 'components/templates/Pagination';
/* types */
import { OutputBlockData } from '@editorjs/editorjs';
import clsx from 'clsx';

// ブロックのタイプごとにコンポーネントを管理するオブジェクト
const renderer: {
  [key: string]: (block: OutputBlockData) => ReactNode;
} = {
  paragraph: (block: OutputBlockData) => <ParagraphPart block={block} />,
  image: (block: OutputBlockData) => <ImagePart block={block} />,
  header: (block: OutputBlockData) => <HeaderPart block={block} />,
  list: (block: OutputBlockData) => <ListPart block={block} />,
  geom: (block: OutputBlockData) => <GeomPart block={block} />,
};

type Props = {
  album: Album;
};

const buildPageData = (data: OutputBlockData[]) => {
  const result = [];
  let i = 0;
  while (i < data.length) {
    const temp = [];
    temp.push(data[i]);
    i++;
    while (i < data.length && data[i].type != 'geom') {
      temp.push(data[i]);
      i++;
    }
    result.push(temp);
  }
  return result;
};

const ProdBlockView = ({ album }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  // geomBlockを区切りでページ分けする
  const pageData = buildPageData(album.data);

  const renderContents = () => {
    if (pageData.length == 0) {
      return (
        <>
          <p className=" text-gray-700">地図アルバムの内容がありません</p>
          <Link
            href={`/builder?album_id=${album.id}`}
            className="text-blue-600 underline"
          >
            こちらから地図アルバムを作成しよう!
          </Link>
        </>
      );
    } else {
      return pageData[currentPage].map((block, i) => {
        return <Fragment key={i}>{renderer[block.type](block)}</Fragment>;
      });
    }
  };

  return (
    <div className="my-12 flex flex-col items-center">
      <div className="flex">
        <div className="px-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowLeft size={32} />
          </button>
        </div>
        <div>
          <h1>{album.title}</h1>
          <p className="p-1">
            {album.startDateString != album.endDateString
              ? album.startDateString + '~' + album.endDateString
              : album.startDateString}
          </p>
        </div>
        <div className="px-6">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(pageData.length - 1, prev + 1))
            }
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowRight size={32} />
          </button>
        </div>
      </div>
      <div className="mx-4 flex max-w-4xl flex-col">{renderContents()}</div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={[...Array(pageData.length)].map((_, i) => i)}
      />
    </div>
  );
};

export default ProdBlockView;
