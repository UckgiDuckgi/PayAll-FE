'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react';

function SimpleBottomSheet({
  isOpen,
  onOpenChange,
  content,
  children,
}: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
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
        tabIndex={-1} // 포커스 가능하도록 설정
        role='dialog' // 접근성 역할 추가
        aria-modal='true' // 모달 상태 명시
      >
        <DrawerHeader className='w-full'>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
          {content}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

export default SimpleBottomSheet;
