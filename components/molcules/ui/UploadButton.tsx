import { Button } from '@/components/ui/button';
import { fileAtom } from '@/stores/atom';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

function UploadButton() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setFile] = useAtom(fileAtom);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/tiff',
        'application/pdf',
      ];
      if (!validTypes.includes(file.type)) {
        alert('지원되는 파일 형식: JPG, JPEG, PNG, TIF, TIFF, PDF');
        return;
      }
      setFile(file);
      router.push('/details/receipt');
    }
  };
  return (
    <div>
      <input
        type='file'
        onChange={handleFileChange}
        accept='.jpg,.jpeg,.png,.tif,.tiff,.pdf'
        className='hidden'
        ref={fileInputRef}
      />
      <Button
        className='h-fit w-fit py-1 px-2 flex items-center gap-1 bg-deepDarkGrey'
        onClick={() => fileInputRef.current?.click()}
      >
        <span className='text-[.625rem] text-grey'>영수증 촬영</span>
        <span className='bg-grey w-[1.25rem] h-[1.25rem] rounded-full flex items-center justify-center'>
          <Image src='/icons/Camera.svg' alt='camera' width={12} height={11} />
        </span>
      </Button>
    </div>
  );
}

export default UploadButton;
