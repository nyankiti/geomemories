export const isObjectEmpty = (obj: { [key: string]: any }) => {
  return !Object.keys(obj).length;
};
