import Image from 'next/image';

function page() {
  return (
    <div className='w-screen h-screen z-50 flex flex-col gap-10'>
      <span>이번 달 목표 금액을 설정해주세요.</span>
      <Image
        src='/images/money.svg'
        alt='documentList'
        width={150}
        height={150}
        className='float-animation'
      />
      <div>
        <span>123123123원</span>
        <span>최근 3개월 간 평균 지출액이에요</span>
      </div>
    </div>
  );
}

export default page;
