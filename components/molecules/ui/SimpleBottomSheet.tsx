'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ReactNode, useState } from 'react';

function SimpleBottomSheet({
  content,
  children,
}: {
  content: ReactNode;
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
      <DrawerContent className='pb-24 pt-6 mx-auto max-w-[512px] px-2 w-full flex flex-col items-start justify-center border-none bg-black text-white'>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
}

export default SimpleBottomSheet;
