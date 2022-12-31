import React, { Dispatch, SetStateAction, useState } from 'react';
/* components */
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Modal from 'components/parts/Modal';
/* repository */
import { deleteAlbum } from 'repository/userRepository';
/* entities */
import { Album } from 'entities/album';
import { SelectedAlbum } from 'pages/myalbums';
import { AlbumsWithThumbnail } from 'firebase/server';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  userId: string;
  selectedAlbum?: SelectedAlbum;
  setAlbums: Dispatch<SetStateAction<AlbumsWithThumbnail[]>>;
};

const DeleteAlbumModal = ({
  userId,
  selectedAlbum,
  visible,
  setVisible,
  setAlbums,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedAlbum) {
      setIsLoading(true);
      await deleteAlbum(userId, selectedAlbum.album?.id);
      setAlbums((prev) => prev.filter((_, i) => i != selectedAlbum.index));
    }
    setVisible(false);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <h3 className="text-center text-base font-normal">
        以下のアルバムを削除しますか？
      </h3>
      <label className="relative mt-2 block" htmlFor="title">
        <p className="p-1 text-center">
          タイトル:
          <span className="ml-2 text-lg font-semibold">
            {selectedAlbum?.album?.title}
          </span>
        </p>
      </label>
      <div className="mt-8 flex justify-evenly">
        {isLoading ? (
          <div className="my-1">
            <AiOutlineLoading3Quarters
              className="animate-spin text-gray-500"
              size={30}
            />
          </div>
        ) : (
          <>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center rounded border-b-2 border-red-400 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-red-500 hover:bg-red-400 hover:text-white"
            >
              <span className="mr-2">消去する</span>
            </button>
            <button
              onClick={() => setVisible(false)}
              className="inline-flex items-center rounded border-b-2 border-green-400 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-500 hover:bg-green-400 hover:text-white"
            >
              <span className="mr-2">戻る</span>
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DeleteAlbumModal;
