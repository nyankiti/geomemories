/* eslint-disable @typescript-eslint/no-var-requires */
import React, { memo, useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import TOOLS from 'libs/editorTools';
const DragDrop = require('editorjs-drag-drop');
const Undo = require('editorjs-undo');

const BlockEditor = () => {
  const editorRef = useRef<EditorJS>();
  const [data, setData] = useState<OutputData>();
  useEffect(() => {
    if (!editorRef.current) {
      // EditorJSの初期化
      const editor = new EditorJS({
        holder: 'editorjs-container',
        tools: TOOLS,
        autofocus: true,
        data,
        placeholder: 'Start writing your story...',
        onChange: async (api) => {
          const data = await api.saver.save();
          console.log(data);
          setData(data);
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
  return (
    <>
      <div id="editorjs-container"></div>
    </>
  );
};

export default memo(BlockEditor);
