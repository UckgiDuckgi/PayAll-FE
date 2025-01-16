'use client';

import { NaverPaymentList } from '@/app/api/naverpay/route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRef, useState } from 'react';

export default function Payments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [serverData, setServerData] = useState<NaverPaymentList | null>(null);

  const cookieRef = useRef<HTMLInputElement>(null);

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

  const bookmarkletCode = `
    javascript:(function() {
      navigator.clipboard.writeText(document.cookie)
        .then(() => alert('쿠키가 복사되었습니다!'))
        .catch(() => alert('복사 실패! 수동으로 복사하세요: ' + document.cookie));
    })();
  `;

  const openWindow = (url: string) => {
    const openUrl = url.includes('https') ? url : 'https://' + url;
    window.open(openUrl, '_blank');
  };

  //   const openWindows = (urls: string[]) => {
  //     urls.forEach((url) => openWindow(url));
  //   };

  const handleInput = async () => {
    try {
      // 클라이언트 데이터를 서버 API로 POST 요청
      const response = await fetch('/api/naverpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://new-m.pay.naver.com/api/timeline/v2/search?page=1&requestUrl=https:%2F%2Fnew-m.pay.naver.com%2Fhistorybenefit%2Fpaymenthistory%3Fpage%3D1&from=MOBILE_PAYMENT_HISTORY',
          cookie: cookieRef.current?.value,
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

      <p className='pt-10'>아래 링크를 브라우저 북마크 바로 드래그하세요:</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `<a href="${bookmarkletCode.trim()}" style="font-size: 18px; color: blue; text-decoration: underline; cursor: pointer;">[쿠키 복사 북마클릿]</a>`,
        }}
      />

      <p className='pt-10'>링크 오픈 테스트</p>
      <a
        href='#'
        onClick={() => openWindow('new-m.pay.naver.com/pcpay')}
        className='text-blue-600 text-[18px]'
      >
        [네이버페이 주문 목록 켜기]
      </a>

      <p className='pt-10 pb-2'>네이버페이 주문내역 불러오기</p>
      <div className='flex w-full gap-3'>
        <input
          ref={cookieRef}
          type='text'
          className='border rounded-md text-black p-1 px-2 w-full'
        />
        <Button className='bg-blue-500 hover:bg-blue-400' onClick={handleInput}>
          입력
        </Button>
      </div>
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
