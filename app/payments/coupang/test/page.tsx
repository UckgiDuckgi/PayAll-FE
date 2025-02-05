'use client';

import { PcodeResponse } from '@/app/api/pcodes/route';
import { Button } from '@/components/ui/button';
import { API_ROUTE } from '@/constants/route';

export default function PasswordInputFormTest() {
  const url = 'https://search.danawa.com/dsearch.php?query=사이다';
  const handleOnClick = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_ROUTE.pcodes}?url=${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = (await response.json()) as PcodeResponse;
      console.log(res.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      Test Page
      <Button className='w-full' onClick={handleOnClick}>
        다나와 가져오기
      </Button>
    </>
  );
}
