import Image from 'next/image';

function CardInfoCard({
  cardImg,
  cardName,
  cardDescription,
}: {
  cardImg: string;
  cardName: string;
  cardDescription: string;
}) {
  return (
    <div className='flex items-center justify-start gap-5 py-5 px-3'>
      <Image src={cardImg} alt='card' width={75} height={47} />
      <div className='flex flex-col justify-center items-start gap-1'>
        <span className='text-grey font-bold text-[.875rem]'>
          {cardDescription}
        </span>
        <span className='text-grey font-medium text-[.75rem]'>{cardName}</span>
      </div>
    </div>
  );
}

export default CardInfoCard;
