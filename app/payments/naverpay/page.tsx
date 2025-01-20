'use client';

import {
  GetCookieResponse,
  NaverPaymentList,
} from '@/app/api/payment/naverpay/route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { formatCookies } from '@/lib/utils';

export default function NaverPayments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [serverData, setServerData] = useState<NaverPaymentList | null>(null);

  const [naverPayResponse, setNaverPayResponse] =
    useState<GetCookieResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('파일을 선택하세요!');
      return;
    }

    console.log('파일: ', selectedFile);

    const reader = new FileReader();

    // 파일 읽기 완료 시 호출
    reader.onload = (e) => {
      setFileContent(e.target?.result as string);
    };

    // 텍스트 파일로 읽기
    reader.readAsText(selectedFile);

    // const formData = new FormData();
    // formData.append('file', selectedFile);

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     setUploadStatus('업로드 성공!');
    //   } else {
    //     setUploadStatus('업로드 실패!');
    //   }
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    //   setUploadStatus('업로드 중 오류 발생!');
    // }
  };

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/payment/naverpay', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = (await response.json()) as GetCookieResponse;
      setNaverPayResponse(res ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = async () => {
    try {
      // 클라이언트 데이터를 서버 API로 POST 요청
      const response = await fetch('/api/payment/naverpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://new-m.pay.naver.com/api/timeline/v2/search?page=1&requestUrl=https:%2F%2Fnew-m.pay.naver.com%2Fhistorybenefit%2Fpaymenthistory%3Fpage%3D1&from=MOBILE_PAYMENT_HISTORY',
          cookie: formatCookies(naverPayResponse?.result ?? []),
        }),
      });
      const { result } = await response.json();
      setServerData(result ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='w-[90%] mx-auto'>
      <div className='mx-auto text-4xl pt-10 text-center'>
        거래 내역 테스트 짬통
      </div>
      <div className='flex flex-col pt-10'>
        <p className='pb-2'>업로드 테스트</p>
        <Badge variant='secondary' className='hover:bg-white'>
          <form
            id='uploadForm'
            className='flex justify-between items-center w-full'
            onSubmit={handleFileUpload}
          >
            <input type='file' id='fileInput' onChange={handleFileChange} />
            <Button type='submit'>업로드</Button>
          </form>
        </Badge>
        {fileContent && (
          <div>
            <span>파일 내용</span>
            <article className='text-wrap bg-white text-black p-[10px] rounded-[5px] overflow-auto max-h-[300px] border border-gray-300'>
              <p className='break-words whitespace-pre-wrap'>{fileContent}</p>
            </article>
          </div>
        )}
      </div>

      <p className='pt-10'>쿠키 가져오기 테스트</p>
      {isLoading ? (
        <>Loading...</>
      ) : naverPayResponse ? (
        <article className='text-wrap bg-white text-black p-[10px] rounded-[5px] overflow-auto max-h-[300px] border border-gray-300'>
          <p className='break-words whitespace-pre-wrap'>
            {formatCookies(naverPayResponse.result)}
          </p>
        </article>
      ) : (
        <Button
          className='font-extrabold mt-3 bg-blue-500 hover:bg-blue-400'
          onClick={handleOnClick}
        >
          네이버페이 쿠키 가져오기
        </Button>
      )}

      <p className='pt-10 pb-2'>주문내역 불러오기 테스트</p>
      <Button className='bg-blue-500 hover:bg-blue-400' onClick={handleInput}>
        네이버페이 주문내역 불러오기
      </Button>
      <div>
        {serverData ? (
          <div className='pt-2'>
            <div className='flex'>
              <span className='w-1/3'>상품명</span>
              <span className='w-1/3'>구매일자</span>
              <span className='w-1/3'>가격</span>
            </div>
            <Separator />
            {serverData.items.map(({ name, date, price }, idx) => (
              <div className='flex' key={idx}>
                <span className='w-1/3'>{name}</span>
                <span className='w-1/3'>{date}</span>
                <span className='w-1/3'>{price}</span>
              </div>
            ))}
            <Separator />
            <div className='flex gap-3 justify-end'>
              <span>총액</span>
              <span>{serverData.totalPrice}</span>
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
}
