'use client';

import { useState } from 'react';
import { requestWithFile } from '@/lib/ocrRequest';

export default function OCRTest() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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
      setOcrResult(''); // 새 파일 선택시 결과 초기화
    }
  };

  const handleOCR = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      const result = await requestWithFile(file);
      const extractedText = result.images[0].fields
        .map((field: { inferText: string }) => field.inferText)
        .join(' ');
      setOcrResult(extractedText);
    } catch (error) {
      console.error('OCR 처리 중 오류:', error);
      setOcrResult('OCR 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='file'
          onChange={handleFileChange}
          accept='.jpg,.jpeg,.png,.tif,.tiff,.pdf'
          className='mb-2'
        />
        <button
          onClick={handleOCR}
          disabled={!file || isLoading}
          className='ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
        >
          {isLoading ? '처리중...' : 'OCR 시작'}
        </button>
      </div>

      {ocrResult && (
        <div className='mt-4'>
          <h3 className='text-lg font-bold mb-2'>OCR 결과:</h3>
          <div className='p-4 border rounded bg-gray-50'>{ocrResult}</div>
        </div>
      )}
    </div>
  );
}
