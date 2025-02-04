'use client';

import { IconIndicator } from '@/components/ui/IconIndicator';

export const SavingRecommendCard = () => {
  const onClickHandler = () => {
    if (window.confirm('하나원큐로 이동하시겠습니까?')) {
      window.location.href =
        'https://mbp.hanabank.com/oneqplus.jsp?MENUM/mbp/resource/html/BCOM/BCOM02/BCOM0204001.html';
    }
  };
  return (
    <button
      className='flex justify-between items-center bg-gradient-to-r from-[#08A9AA] to-[#94CED1] px-5 rounded-lg text-left'
      onClick={onClickHandler}
    >
      <div>
        <div className='font-dohyeon text-[.875rem]'>
          절약한 금액으로 목돈 마련하기
        </div>
        <div className='text-[.5625rem]'>하나원큐 추천 예적금 둘러보기</div>
      </div>
      <IconIndicator src='/images/OneQ.png' height={65} />
    </button>
  );
};
