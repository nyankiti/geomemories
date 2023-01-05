import React, { Dispatch, SetStateAction } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import clsx from 'clsx';

type PEProps = {
  handleClick: () => void;
  isCurrentPage: boolean;
  num: number;
};
const PaginationElement = ({ handleClick, isCurrentPage, num }: PEProps) => {
  return (
    <li className="px-[6px]">
      <button
        onClick={handleClick}
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base hover:opacity-50',
          isCurrentPage ? 'bg-blue-50 text-blue-500' : 'text-[#838995]',
        )}
      >
        {num}
      </button>
    </li>
  );
};

type Props = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageNumbers: number[];
};

const Pagination = ({ currentPage, setCurrentPage, pageNumbers }: Props) => {
  const renderContents = () => {
    // ページが5以下の場合は全て表示する
    if (pageNumbers.length <= 5) {
      return pageNumbers.map((i) => (
        <PaginationElement
          key={i}
          handleClick={() => setCurrentPage(i)}
          num={i + 1}
          isCurrentPage={currentPage == i}
        />
      ));
    } else if (2 <= currentPage && currentPage < pageNumbers.length - 2) {
      // 現在のページが最初の2つでも、最後の2つでもない場合
      return (
        <>
          <PaginationElement
            handleClick={() => setCurrentPage(0)}
            num={1}
            isCurrentPage={currentPage == 0}
          />
          <li className="px-[6px]">
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50">
              <BsThreeDots size={24} />
            </button>
          </li>
          <PaginationElement
            handleClick={() => setCurrentPage(currentPage)}
            num={currentPage + 1}
            isCurrentPage={currentPage == currentPage}
          />
          <li className="px-[6px]">
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50">
              <BsThreeDots size={24} />
            </button>
          </li>
          <PaginationElement
            handleClick={() => setCurrentPage(pageNumbers.length - 1)}
            num={pageNumbers.length}
            isCurrentPage={currentPage == pageNumbers.length - 1}
          />
        </>
      );
    } else {
      return (
        <>
          {pageNumbers.slice(0, 2).map((i) => {
            return (
              <PaginationElement
                key={i}
                handleClick={() => setCurrentPage(i)}
                num={i + 1}
                isCurrentPage={currentPage == i}
              />
            );
          })}
          <li className="px-[6px]">
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50">
              <BsThreeDots size={24} />
            </button>
          </li>
          {pageNumbers
            .slice(pageNumbers.length - 2, pageNumbers.length)
            .map((i) => {
              return (
                <PaginationElement
                  key={i}
                  handleClick={() => setCurrentPage(i)}
                  num={i + 1}
                  isCurrentPage={currentPage == i}
                />
              );
            })}
        </>
      );
    }
  };
  return (
    <ul className="flex items-center p-4">
      {currentPage != 0 && (
        <li className="px-[6px]">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowLeft size={32} />
          </button>
        </li>
      )}

      {renderContents()}

      {currentPage != pageNumbers.length - 1 && (
        <li className="px-[6px]">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(pageNumbers.length - 1, prev + 1),
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-base text-[#838995] hover:opacity-50"
          >
            <MdKeyboardArrowRight size={32} />
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
