import { I18nConfig, I18nDictionary } from '@editorjs/editorjs';
export const BLOCK_ID_LEN = 10;

export const i18n: I18nConfig = {
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': 'クリックして調整',
          'or drag to move': 'ドラッグして移動',
        },
      },
      inlineToolbar: {
        converter: {
          'Convert to': '変換',
        },
      },
      toolbar: {
        toolbox: {
          Add: '追加',
        },
      },
    },
    toolNames: {
      Text: 'テキスト',
      Heading: '見出し',
      List: 'リスト',
      Checklist: 'チェックリスト',
      Quote: '引用',
      Delimiter: '直線',
      Table: '表',
      Link: 'リンク',
      Bold: '太字',
      Italic: '斜体',
      Image: '画像',
      Marker: 'マーカー',
    },
    blockTunes: {
      delete: {
        Delete: '削除',
        'Click to delete': '再クリックで消去',
      },
      moveUp: {
        'Move up': '上に移動',
      },
      moveDown: {
        'Move down': '下に移動',
      },
    },
    tools: {
      list: {
        Ordered: 'ナンバリング',
        Unordered: '箇条書き',
      },
    },
  },
};
