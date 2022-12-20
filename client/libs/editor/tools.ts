/* eslint-disable @typescript-eslint/no-var-requires */
const Header = require('@editorjs/header');
const List = require('@editorjs/list');
const Quote = require('@editorjs/quote');
const ImageTool = require('@editorjs/image');
import GeomBlock from './geomBlock';
import { uploadImage } from '../storage';

const TOOLS = {
  geom: GeomBlock,
  header: {
    class: Header,
  },
  image: {
    class: ImageTool,
    config: {
      // endpoints: {
      //   byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
      //   byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      // },
      uploader: {
        uploadByFile: async (file: File) => {
          // const form: UploadFileForm = { image: file };
          // return editorService.uploadFile(form).then((res) => res.data);
          console.log('uploadByFile');
          // const res = await uploadImage('users', file);
          // console.log(res);
        },
        // only work when url has extensions like .jpg
        uploadByUrl(url: string) {
          // const form: UploadUrlForm = { url };
          // return editorService.uploadFileByUrl(form);
        },
      },
    },
  },
  list: List,
  quote: Quote,
};

export default TOOLS;
