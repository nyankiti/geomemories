import React, { Dispatch, SetStateAction } from 'react';
/* components */
import Modal from 'components/parts/Modal';
/* types */
import { GeometoryObject } from 'entities/geometory';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  geometoryObj: GeometoryObject;
  handleRegister: any;
};

const SpotPickModal = ({
  visible,
  setVisible,
  geometoryObj,
  handleRegister,
}: Props) => {
  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <h3 className="text-lg">以下の地点を登録しますか</h3>
      <div className="p-2">
        <p>名前: {geometoryObj.name}</p>
        <p>住所: {geometoryObj.formatted_address}</p>
        {geometoryObj.website && <p>website: {geometoryObj.website}</p>}
      </div>
      <div className="flex justify-evenly">
        <button
          onClick={handleRegister}
          className="inline-flex items-center rounded border-b-2 border-green-400 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-500 hover:bg-green-400 hover:text-white"
        >
          <span className="mr-2">登録</span>
        </button>
        <button
          onClick={() => setVisible(false)}
          className="inline-flex items-center rounded border-b-2 border-red-400 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-red-500 hover:bg-red-400 hover:text-white"
        >
          <span className="mr-2">戻る</span>
        </button>
      </div>
    </Modal>
  );
};

export default SpotPickModal;
