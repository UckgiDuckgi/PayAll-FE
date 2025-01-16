import { ReactNode } from 'react';

function TitleBottomLine({
  left,
  right,
  children,
}: {
  left: string;
  right: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className='w-full py-2 flex items-center font-medium justify-between text-[.8125rem] border-b-[1px] border-grey'>
        <span>{left}</span>
        <span className='text-white'>{right}</span>
      </div>
      {children}
    </>
  );
}

export default TitleBottomLine;
