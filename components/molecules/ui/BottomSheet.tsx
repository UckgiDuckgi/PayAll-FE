'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ReactNode, useState } from 'react';

function BottomSheet({
  title,
  description,
  desciptionFooter,
  btnTexts,
  children,
}: {
  title: string;
  description: string;
  desciptionFooter: ReactNode;
  btnTexts: string[];
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div onClick={toggleDialog}>{children}</div>
      </DrawerTrigger>
      <DrawerContent className='mx-auto max-w-[512px] px-2 pb-6 w-full flex flex-col items-start justify-center border-none bg-deepDarkGrey'>
        <DrawerHeader className='space-y-2 w-full '>
          <DrawerTitle className='text-white text-left'>{title}</DrawerTitle>
          <DrawerDescription className='space-y-2'>
            <div className='text-grey text-left'>{description}</div>
            <div className='w-full'>{desciptionFooter}</div>
          </DrawerDescription>
        </DrawerHeader>
        <div className='w-full flex items-center justify-center gap-3'>
          <Button
            className='bg-white w-[40%] text-background hover:bg-[#D9D9D9]'
            onClick={toggleDialog}
          >
            {btnTexts[0]}
          </Button>
          <Button
            className='hover:bg-[#4B4B4B] hover:text-white bg-darkGrey w-[55%] text-white border-none'
            variant='outline'
            onClick={() => {
              toggleDialog();
              console.log('장바구니 담기 로직 추가');
            }}
          >
            {btnTexts[1]}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default BottomSheet;
