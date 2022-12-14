import React, { useState, FormEvent } from 'react';
import clsx from 'clsx';
import { IoMdSearch } from 'react-icons/io';

const MapSearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <form
      className="m-auto flex w-full max-w-2xl items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className={clsx(
          'relative w-full rounded border-2 bg-white text-sm text-gray-900 shadow-md',
          isFocus ? 'border-blue-600 ring-blue-600' : 'border-gray-400',
        )}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IoMdSearch className="text-gray-500" size={20} />
        </div>
        <input
          type="text"
          id="search"
          className="w-full p-2 pl-10 outline-none"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={`スポットを検索してみよう`}
          required={true}
        />
      </div>
    </form>
  );
};

export default MapSearchBar;
