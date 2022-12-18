import React, { useState, FormEvent } from 'react';
import clsx from 'clsx';
import { IoMdSearch } from 'react-icons/io';
/* const */
import {
  MAP_SEARCHBAR_ID,
  MAP_SEARCH_FORM_ID,
  NOTES_BALLOON_ID,
} from 'libs/globalConst';

const MapSearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <form
      id={MAP_SEARCH_FORM_ID}
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
          id={MAP_SEARCHBAR_ID}
          className="w-full p-2 pl-10 outline-none"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={`スポットを検索してみよう`}
          required={true}
        />
        <div
          id={NOTES_BALLOON_ID}
          className="balloon opacity-0 shadow-xl transition duration-500"
        >
          <p>訪れた場所を検索し、地図アルバムに追加しよう!</p>
        </div>
      </div>
    </form>
  );
};

export default MapSearchBar;
