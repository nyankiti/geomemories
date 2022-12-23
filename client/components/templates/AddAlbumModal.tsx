import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
/* components */
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Modal from 'components/parts/Modal';
/* repository */
import { createNewAlbum } from 'repository/userRepository';
/* utils */
import { getDateString } from 'utils/time';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  userId: string;
};

type Input = {
  title: string;
  startDateString: string;
  endDateString: string;
};

const AddAlbumModal = ({ userId, visible, setVisible }: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Input>({
    defaultValues: {
      title: '',
      startDateString: getDateString(new Date()),
      endDateString: getDateString(new Date()),
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setIsLoading(true);
    const newAlubmId = await createNewAlbum(userId, data);
    if (newAlubmId) {
      // firebaseへの連続書き込みを防ぐために 1 秒待つ
      setTimeout(() => {
        router.push(`/builder?album_id=${newAlubmId}`);
        setIsLoading(false);
      }, 1000);
    } else {
      // ここに何かエラーハンドリングを入れたい
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <h3 className="text-center text-lg">新規アルバムを作成する</h3>
      <label className="relative mt-2 block" htmlFor="title">
        <p className="p-1">タイトル</p>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          id="title"
          {...register('title', { required: true })}
          type="text"
          placeholder="アルバムのタイトル"
        />
      </label>
      <div className="mt-4 flex items-center">
        <div className="w-full">
          <label
            htmlFor="startDateString"
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
            htmlFor="endDateString"
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
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddAlbumModal;
