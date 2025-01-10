'use client';

import { CameraCapture } from '@/components/CameraCapture';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { requestWithFile } from '@/lib/ocrRequest';

interface OCRItem {
  name: { text: string };
  count: { text: string };
  price: { price: { text: string } };
}

export default function OCRTest() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<OCRItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(true);

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
      setOcrResult(null); // 새 파일 선택시 결과 초기화
    }
  };

  const handleCameraCapture = (capturedFile: File) => {
    setFile(capturedFile);
    setOcrResult(null);
    setShowCamera(false);
  };

  const handleOCR = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      const result = await requestWithFile(file);

      if (!result?.images?.[0]?.receipt?.result?.subResults?.[0]?.items) {
        throw new Error('올바르지 않은 OCR 응답 형식');
      }

      const items: OCRItem[] =
        result.images[0].receipt.result.subResults[0].items;
      setOcrResult(items);
    } catch (error) {
      console.error('OCR 처리 중 오류:', error);
      setOcrResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <div className='mb-4 space-y-4'>
        {showCamera ? (
          <div className='space-y-4'>
            <CameraCapture onCapture={handleCameraCapture} />
            <Button
              variant='outline'
              onClick={() => setShowCamera(false)}
              className='w-full text-black'
            >
              파일 업로드로 돌아가기
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <input
                type='file'
                onChange={handleFileChange}
                accept='.jpg,.jpeg,.png,.tif,.tiff,.pdf'
                className='flex-1'
              />
              <Button
                onClick={() => setShowCamera(true)}
                variant='outline'
                className='text-black'
              >
                카메라로 촬영
              </Button>
            </div>
            <Button
              onClick={handleOCR}
              disabled={!file || isLoading}
              className='w-full text-black'
            >
              {isLoading ? '처리중...' : 'OCR 시작'}
            </Button>
          </div>
        )}

        {file && (
          <div className='mt-2 text-sm text-gray-600'>
            선택된 파일: {file.name}
          </div>
        )}
      </div>

      {ocrResult && (
        <div className='mt-4'>
          <h3 className='text-lg font-bold mb-2'>OCR 결과:</h3>
          <div className='p-4 border rounded bg-gray-50 text-black'>
            {typeof ocrResult === 'string' ? (
              // 에러 메시지 표시
              <p>{ocrResult}</p>
            ) : (
              // 테이블 컴포넌트로 렌더링
              <table className='min-w-full'>
                <thead>
                  <tr className='bg-gray-100 border-b'>
                    <th className='p-2 text-left'>상품명</th>
                    <th className='p-2 text-center'>개수</th>
                    <th className='p-2 text-right'>가격</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    ocrResult as Array<{
                      name: { text: string };
                      count: { text: string };
                      price: { price: { text: string } };
                    }>
                  ).map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='p-2'>{item.name.text}</td>
                      <td className='p-2 text-center'>{item.count.text}</td>
                      <td className='p-2 text-right'>
                        {item.price.price.text}원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
