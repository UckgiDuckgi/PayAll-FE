'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ReactNode, useEffect, useRef } from 'react';

function SimpleBottomSheet({
  isOpen,
  onOpenChange,
  content,
  children,
}: {
  isOpen: boolean;
  onOpenChange?: () => void;
  content: ReactNode;
  children: ReactNode;
}) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && drawerRef.current) {
      // Drawer가 열릴 때 포커스 설정
      drawerRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <div>{children}</div>
      </DrawerTrigger>
      <DrawerContent
        ref={drawerRef}
        className='pb-24 pt-6 mx-auto max-w-[512px] px-2 w-full flex flex-col items-start justify-center border-none bg-black text-white'
        role='dialog'
        aria-modal='true'
      >
        <DrawerHeader className='w-full'>
          <DrawerTitle></DrawerTitle>
          {content}
          <DrawerDescription />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

export default SimpleBottomSheet;
