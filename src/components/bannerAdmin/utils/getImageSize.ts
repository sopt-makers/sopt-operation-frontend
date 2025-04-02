interface ImgSize {
  width: number;
  height: number;
}

export const getImageSize = async (url: string): Promise<ImgSize> => {
  return new Promise((res) => {
    const img = new Image();

    img.src = url;

    img.onload = () => {
      const { width, height } = img;

      const size: ImgSize = { width, height };

      res(size);
    };
  });
};
