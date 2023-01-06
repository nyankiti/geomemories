import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
/* components */
import Modal from 'components/parts/Modal';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const RecommendLoginModal = ({ visible, setVisible }: Props) => {
  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <div className="m-auto flex flex-col items-center">
        <h3 className="my-4 text-lg">
          地図アルバムを保存するにはログインが必要です
        </h3>
        <Link href="/login">
          <button
            onClick={() => setVisible(false)}
            className="inline-flex items-center rounded border-b-2 border-green-400 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-500 hover:bg-green-400 hover:text-white"
          >
            <span className="mr-2">ログイン画面へ</span>
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default RecommendLoginModal;
