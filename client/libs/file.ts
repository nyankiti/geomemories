export const getFileEtension = (filename: string) => {
  return filename.split('.').pop();
};
