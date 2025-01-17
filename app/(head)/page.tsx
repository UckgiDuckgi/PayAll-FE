'use client';

import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import { PayAllLogo } from '@/components/ui/PayAllLogo';

export default function Home() {
  return (
    <>
      <div className='flex justify-center items-center'>
        <PayAllLogo />
        <AdCarousel />
      </div>
    </>
  );
}
