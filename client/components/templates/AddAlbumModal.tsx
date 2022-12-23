import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
/* components */
import Modal from 'components/parts/Modal';
/* entities */
/* utils */
import { getDateString } from 'utils/time';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

type Input = {
  title: string;
  startDateString: string;
  endDateString: string;
};

const AddAlbumModal = ({ visible, setVisible }: Props) => {
  const { register, handleSubmit } = useForm<Input>({
    defaultValues: {
      title: '',
      startDateString: getDateString(new Date()),
      endDateString: getDateString(new Date()),
    },
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <h3 className="text-center text-lg">新規アルバムを作成する</h3>
      <label className="relative mt-2 block" htmlFor="name">
        <p className="p-1">タイトル</p>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          id="quoteFrom"
          {...register('title')}
          type="text"
          placeholder="アルバムのタイトル"
        />
      </label>
      <div className="mt-4 flex items-center">
        <div className="w-full">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            開始日
          </label>
          <input
            type="date"
            {...register('startDateString')}
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="alias"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            終了日(なくても良い)
          </label>
          <input
            type="date"
            {...register('endDateString')}
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-evenly">
        <button
          onClick={handleSubmit(onSubmit)}
          className="inline-flex items-center rounded border-b-2 border-green-400 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-500 hover:bg-green-400 hover:text-white"
        >
          <span className="mr-2">作成</span>
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

export default AddAlbumModal;
