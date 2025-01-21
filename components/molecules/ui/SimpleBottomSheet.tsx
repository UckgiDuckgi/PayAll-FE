'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ReactNode } from 'react';

function SimpleBottomSheet({
  isOpen,
  onOpenChange,
  content,
  children,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  content: ReactNode;
  children: ReactNode;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <div onClick={onOpenChange}>{children}</div>
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
