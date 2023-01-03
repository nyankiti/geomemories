/* eslint-disable @typescript-eslint/no-var-requires */
const Header = require('@editorjs/header');
const List = require('@editorjs/list');
const Quote = require('@editorjs/quote');
import GeomBlock from './geomBlock';
import { storage } from '../../firebase/client';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { getFileEtension } from 'utils/file';
/* editor tool, tune */
import MyImageTool from './MyImageTool';
import { MyDuplicateTune } from './MyDuplicateTune';

const TOOLS = {
  // duplicateはいつか実装したい
  // duplicate: MyDuplicateTune,
  geom: GeomBlock,
  header: {
    class: Header,
  },
  image: {
    class: MyImageTool,
    config: {
      read_only: false,
      uploader: {
        uploadByFile: async (file: File) => {
          const storageRef = ref(storage, 'images/' + file.name);
          const metadata = {
            contentType: 'image/' + getFileEtension(file.name),
          };
          const uploadTask = await uploadBytes(storageRef, file, metadata);
          const downloadURL = await getDownloadURL(uploadTask.ref);
          return {
            success: 1,
            file: {
              url: downloadURL,
            },
          };
        },
        // only work when url has extensions like .jpg
        uploadByUrl(url: string) {
          return new Promise((resolve) => {
            resolve({
              success: 1,
              file: {
                url: url,
              },
            });
          });
        },
      },
    },
  },
  list: {
    class: List,
    config: {
      defaultStyle: 'unordered',
    },
  },
  // quote: Quote,
};

export default TOOLS;
