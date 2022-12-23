import React from 'react';
/* global state */
import { useAlbumState } from 'globalState/albumState';

const AlbumTitleForm = () => {
  const [album, setAlbum] = useAlbumState();
  return (
    <div className="m-6 flex">
      <div className="mt-2 block">
        <label htmlFor="title" className="mx-2 p-1 text-lg font-semibold">
          地図アルバムのタイトル:
        </label>
        <input
          className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg font-semibold text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          name="title"
          type="text"
          placeholder="アルバムのタイトル"
          value={album.title}
          onChange={(e) =>
            setAlbum((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="ml-24 flex items-center">
        <div className="mx-2">
          <label
            htmlFor="startDateString"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            開始日
          </label>
          <input
            type="date"
            name="startDateString"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={album.startDateString ?? '2000-01-01'}
            onChange={(e) =>
              setAlbum((prev) => ({ ...prev, startDateString: e.target.value }))
            }
          />
        </div>
        <div className="mx-2">
          <label
            htmlFor="endDateString"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            終了日(なくても良い)
          </label>
          <input
            type="date"
            name="endDateString"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={album.endDateString ?? '2000-01-01'}
            onChange={(e) =>
              setAlbum((prev) => ({ ...prev, endDateString: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumTitleForm;
