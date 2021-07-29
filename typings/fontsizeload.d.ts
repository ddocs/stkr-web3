declare module 'fontfaceonload' {
  const FontFaceOnload: (
    font: string,
    params: {
      success: () => void;
      error?: () => void;
      timeout?: number;
    },
  ) => void;
  export default FontFaceOnload;
}
