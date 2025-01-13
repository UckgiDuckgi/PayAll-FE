import { AccentText } from '@/components/ui/AccentText';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function Sion() {
  return (
    <div>
      <Button variant='basic' className=''>
        동의
      </Button>
      <Button variant='back' className='mt-4'>
        홈으로
      </Button>
      <Button variant='util' className='mt-4'>
        담기
      </Button>
      <Button variant='util' className='mt-4' size='sm'>
        연동하기
      </Button>
      <div className='mt-4'>
        <Checkbox className=''></Checkbox>
      </div>
      <AccentText
        prefix='목표 달성을 위해서는 하루 평균 '
        accent='10,000원'
        suffix='을 아껴야해요.'
        className='mt-4'
      />
      <AccentText
        prefix='지난달 대비 '
        accent='▼ 31,710 '
        suffix='원 지출했어요.'
        className='mt-4'
      />
      <AccentText
        prefix='지난달 대비 '
        accent='▲ 53,400'
        suffix='원 지출했어요.'
        className='mt-4'
        accentColor='text-red'
      />
      <AccentText
        prefix='하루 평균 '
        accent='53,400원'
        suffix=' 썼어요.'
        className='mt-4 text-[#AAAAAAs]'
        accentColor='text-white'
      />
    </div>
  );
}
