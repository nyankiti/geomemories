/* eslint-disable @typescript-eslint/no-var-requires */
import React, { memo, useEffect, useId, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import TOOLS from 'libs/editor/tools';
import { BLOCK_ID_LEN, i18n } from 'libs/editor/const';
const DragDrop = require('editorjs-drag-drop');
const Undo = require('editorjs-undo');
/* globalState */
import { useBuilderState } from 'components/globalState/builderState';
import { usePassedGeomObjValue } from 'components/globalState/passedGeomObjState';
/* utils */
import { isObjectEmpty } from 'utils/object';

const BlockEditor = () => {
  const editorId = useId();
  const editorRef = useRef<EditorJS>();
  // global state
  const [builderState, setBuilderState] = useBuilderState();
  const passedGeomObj = usePassedGeomObjValue();

  // google mapで位置が選択された場合、editorに反映される
  useEffect(() => {
    if (passedGeomObj && editorRef.current && editorRef.current.render) {
      const prevBlocks = builderState
        ? builderState.blocks.filter(
            (block) => !(block.type == 'geom' && isObjectEmpty(block.data)),
          )
        : [];
      editorRef.current.render({
        time: Date.now(),
        blocks: [
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
        ],
      });
    }
  }, [passedGeomObj]);

  useEffect(() => {
    if (!editorRef.current) {
      // EditorJSの初期化
      const editor = new EditorJS({
        holder: editorId,
        tools: TOOLS,
        autofocus: true,
        data: builderState,
        i18n,
        placeholder: 'Start writing your story...',
        onChange: async (api) => {
          const data = await api.saver.save();
          console.log(data);
          setBuilderState(data);
        },
        onReady: () => {
          // On the editor, use Ctrl + Z or ⌘ + Z to undo, or use Ctrl + Y or ⌘ + Y to redo.
          new Undo({ editor });
          // Blockのドラックアンドドロップでの移動が可能になる
          new DragDrop(editor);
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

  return <div id={editorId} />;
};

export default memo(BlockEditor);
