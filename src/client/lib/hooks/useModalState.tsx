import { useState } from 'react';

export const useModalState = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  return { isOpened, handleOpen, handleClose } as const;
};
