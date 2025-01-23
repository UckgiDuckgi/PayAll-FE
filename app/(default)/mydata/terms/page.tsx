'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function TermsContent() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const searchParams = useSearchParams();
  const complete = searchParams.get('complete');
  const [isChecked, setIsChecked] = useState(false);

  const handleAgree = () => {
    if (!isChecked) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setIsChecked(true);
      }, 500);
    } else {
      router.push(`/mydata?complete=${true}`);
    }
  };

  if (!complete) {
    return (
      <>
        <motion.div
          className='fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50'
          style={{
            scaleX: scrollYProgress,
            transformOrigin: 'left',
          }}
        />
        <div className='py-5 w-[90%] mx-auto flex flex-col items-start justify-center gap-1'>
          <div className='w-full flex flex-col font-bold items-center justify-center text-[1.375rem]'>
            <span className='text-[1.25rem] font-bold'>
              마이데이터 서비스 이용 동의서
            </span>
            <span className='text-[1rem]'>
              PayAll 이용약관 및 개인정보 수집·이용 동의
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>제1조 (목적)</span>
            <span className='text-[.75rem] text-grey'>
              본 동의서는 고객이 PayAll을 이용함에 있어, 하나은행 마이데이터를
              연동하여 금융 정보를 활용하고 서비스 제공을 목적으로 고객의
              개인정보를 수집·이용 및 제3자에게 제공하는 사항을 명확히
              규정합니다.
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>제2조 (수집 및 이용 목적)</span>
            <span className='text-[.75rem] text-grey'>
              고객의 마이데이터는 다음과 같은 목적으로 활용됩니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              1. 금융 자산 통합 조회 및 관리 서비스 제공
            </span>
            <span className='text-[.75rem] text-grey'>
              2. 맞춤형 금융 상품 추천 및 컨설팅 제공
            </span>
            <span className='text-[.75rem] text-grey'>
              3. 소비 패턴 분석 및 개인화된 리포트 제공
            </span>
            <span className='text-[.75rem] text-grey'>
              4. 고객 경험 개선 및 서비스 품질 향상을 위한 데이터 분석
            </span>
            <span className='text-[.75rem] text-grey'>
              5. 법적·규제 요구사항의 준수
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>제3조 (수집 및 이용 항목)</span>
            <span className='text-[.75rem] text-grey'>
              하나은행으로부터 제공받는 데이터는 다음과 같습니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              계좌 정보: 계좌 번호, 계좌 잔액, 거래 내역
            </span>
            <span className='text-[.75rem] text-grey'>
              카드 사용 내역: 결제 금액, 결제 일자, 사용처
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>
              제4조 (정보 보유 및 이용 기간)
            </span>
            <span className='text-[.75rem] text-grey'>
              수집된 정보는 서비스 제공을 위해 필요한 기간 동안만
              보유·이용됩니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              고객이 동의를 철회하거나 수집·이용 목적이 달성된 경우 해당 정보는
              지체 없이 파기됩니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              단, 관련 법령에 의해 보관이 요구되는 경우에는 법령에서 정한 기간
              동안 보관합니다.
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>제5조 (제3자 제공)</span>
            <span className='text-[.75rem] text-grey'>
              고객의 마이데이터는 아래와 같은 경우 제3자에게 제공됩니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              데이터 제공자: 하나은행
            </span>
            <span className='text-[.75rem] text-grey'>
              데이터 수신자: [귀사의 법인명]
            </span>
            <span className='text-[.75rem] text-grey'>
              제공 목적: 서비스 제공 및 개인화된 분석 제공
            </span>
            <span className='text-[.75rem] text-grey'>
              제공 항목: 계좌 정보, 대출 정보, 카드 사용 내역 등 제3조에 명시된
              항목
            </span>
            <span className='text-[.75rem] text-grey'>
              제공 기간: 서비스 제공 기간 동안
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>
              제6조 (동의 철회 및 삭제 요청)
            </span>
            <span className='text-[.75rem] text-grey'>
              고객은 언제든지 동의를 철회하거나 개인정보 삭제를 요청할 수
              있습니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              동의 철회 시, 서비스 제공이 제한될 수 있으며 철회 이후에도 관련
              법령에서 정한 범위 내에서는 데이터가 보관될 수 있습니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              동의 철회 및 삭제 요청 방법: [앱 내 설정 메뉴 또는 고객센터
              연락처]
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>제7조 (권리와 책임)</span>
            <span className='text-[.75rem] text-grey'>
              고객은 자신의 개인정보 처리와 관련하여 열람, 정정, 삭제, 처리 정지
              등을 요청할 수 있습니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              당사는 고객의 요청을 성실히 처리하며, 처리 결과를 안내합니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              고객의 부주의로 인해 발생한 개인정보 유출 또는 오류 입력에 따른
              책임은 고객 본인에게 있습니다.
            </span>
          </div>

          <div className='my-3 flex flex-col items-start justify-center gap-1'>
            <span className='text-[1.125rem]'>제8조 (보안 관리)</span>
            <span className='text-[.75rem] text-grey'>
              당사는 고객의 정보를 안전하게 관리하기 위해 개인정보 보호법과
              신용정보법에 따른 보안 조치를 이행합니다.
            </span>
            <span className='text-[.75rem] text-grey'>
              정보 전송 시 암호화 기술을 사용하며, 데이터 접근 권한은
              최소화됩니다.
            </span>
            <div
              onClick={() => setIsChecked((prev) => !prev)}
              className='flex items-center justify-start gap-3 mt-3 mb-12'
            >
              <Checkbox checked={isChecked} />
              <label htmlFor='agree' className='text-[.75rem]'>
                본인은 하나은행 마이데이터를 활용한 서비스 제공을 위해 개인정보
                수집·이용에 동의합니다.
              </label>
            </div>
          </div>
        </div>
        <div
          className='w-[90%] fixed bottom-3 max-w-[460px]'
          onClick={handleAgree} // 버튼 클릭 시 동작 설정
        >
          <Button className='w-full bg-main hover:bg-[#476BE3]'>동의</Button>
        </div>
      </>
    );
  }

  return (
    <div className='relative mx-auto h-[100dvh] flex flex-col items-center justify-center'>
      <div className='mx-auto w-[300px] sm:w-[350px] h-auto'>
        <video
          src='/images/complete.mp4'
          width='350px'
          height='250px'
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className='space-y-3 text-center font-bold mt-10 text-[1rem]'>
        <p>마이데이터가 연동되었어요.</p>
        <p>더 많은 기능을 이용하러 가볼까요?</p>
      </div>
      <div className='fixed bottom-8 w-[90%] max-w-[460px]'>
        <Link href='/' className='w-full'>
          <Button className='w-full bg-main text-white hover:bg-[#476BE3]'>
            확인
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsContent />
    </Suspense>
  );
}
