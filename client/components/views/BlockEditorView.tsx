/* eslint-disable @typescript-eslint/no-var-requires */
import React, { memo, useEffect, useId, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import EditorJS, {
  API,
  OutputBlockData,
  EditorConfig,
} from '@editorjs/editorjs';
import TOOLS from 'libs/editor/tools';
import { BLOCK_ID_LEN, i18n } from 'libs/editor/const';
const DragDrop = require('editorjs-drag-drop');
const Undo = require('editorjs-undo');
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
/* globalState */
import { useBlockDataState } from 'components/globalState/blockDataState';
import { usePassedGeomObjValue } from 'components/globalState/passedGeomObjState';
/* utils */
import { isObjectEmpty } from 'utils/object';
/* repository */
import { addBlocks } from 'repository/userRepository';
/* hooks */
import { useAuth } from 'context/authContext';

type Props = {
  savedBlocks: OutputBlockData[];
};

const BlockEditor = ({ savedBlocks }: Props) => {
  const editorId = useId();
  const editorRef = useRef<EditorJS>();
  // state
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  // editor.js の API に実装されているnotifierを外部から呼び出すためのstate
  const [notifier, setNotifier] = useState<{ show: (option: any) => void }>();
  // global state
  const [blockData, setBlockData] = useBlockDataState();
  const passedGeomObj = usePassedGeomObjValue();
  const { user } = useAuth();

  // google mapで位置が選択された場合、editorに反映される
  useEffect(() => {
    if (passedGeomObj && editorRef.current && editorRef.current.render) {
      const prevBlocks = blockData
        ? blockData?.filter(
            (block) => !(block.type == 'geom' && isObjectEmpty(block.data)),
          )
        : [];
      const newBlocks = [
        ...prevBlocks,
        {
          // ここのidはコロコロを変えるのはよくなさそう
          id: nanoid(BLOCK_ID_LEN),
          type: 'geom',
          data: passedGeomObj,
        },
        {
          id: nanoid(BLOCK_ID_LEN),
          type: 'paragraph',
          data: { text: '' },
        },
      ];

      editorRef.current.render({
        time: Date.now(),
        blocks: newBlocks,
      });
      setBlockData(newBlocks);
    }
  }, [passedGeomObj]);

  useEffect(() => {
    if (!editorRef.current) {
      // EditorJSの初期化
      const editor = new EditorJS({
        holder: editorId,
        tools: TOOLS,
        autofocus: true,
        data: { blocks: savedBlocks },
        i18n,
        placeholder: 'Start writing your story...',
        onChange: async (api) => {
          const data = await api.saver.save();
          setBlockData(data.blocks);
          if (!notifier) {
            setNotifier(api.notifier);
          }
        },
        onReady: () => {
          // On the editor, use Ctrl + Z or ⌘ + Z to undo, or use Ctrl + Y or ⌘ + Y to redo.
          new Undo({ editor });
          // Blockのドラックアンドドロップでの移動が可能になる
          new DragDrop(editor);
          // server side propとして受け取った初期値の反映
          setBlockData(savedBlocks);
        },
      });
      editorRef.current = editor;
    }
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const handlePressSave = async () => {
    if (user && notifier) {
      setIsSaveLoading(true);
      const result = await addBlocks(user?.id, blockData);
      if (result) {
        notifier.show({ message: '更新しました' });
      } else {
        notifier.show({
          message: '通信エラーが発生しました。時間をおいて再度試してください',
        });
      }
      setIsSaveLoading(false);
    }
  };

  return (
    <div className="">
      <div className="p-2 text-center">
        <p className="text-lg">
          地図アルバムを作ろう(
          <a className="cursor-pointer text-blue-400 hover:underline">
            作り方はこちら→
          </a>
          )
        </p>
      </div>
      {/* 以下の div 要素に editor.js がマウントされる */}
      <div id={editorId} />
      <div className="flex items-center justify-center">
        {isSaveLoading ? (
          <button className="px-4 py-2">
            <AiOutlineLoading3Quarters
              className="animate-spin text-gray-500"
              size={24}
            />
          </button>
        ) : (
          <button
            onClick={handlePressSave}
            className="rounded border border-indigo-100 bg-indigo-50 px-4 py-2 font-medium text-cyan-700 outline-none transition-colors duration-200 hover:bg-cyan-700 hover:text-white focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2 active:scale-95"
          >
            保存
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(BlockEditor);
