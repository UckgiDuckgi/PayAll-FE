'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';

export function Modal({
  title,
  description,
  btnText,
  children,
}: {
  title: string;
  description: string;
  btnText: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={toggleDialog}>{children}</div>
      </DialogTrigger>
      <DialogContent className='w-[80%] max-w-[400px] py-8 border-none rounded-[20px] bg-deepDarkGrey'>
        <DialogHeader className='text-center w-full space-y-4'>
          <DialogTitle className='text-white'>{title}</DialogTitle>
          <DialogDescription className='text-white'>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className='text-background bg-white hover:bg-[#D9D9D9]'
            onClick={toggleDialog}
          >
            {btnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
