export const convertFileToFileType = (file) => {
  return {
    file,
    url: URL.createObjectURL(file)
  }
}
