'use client';

import { motion } from 'framer-motion';
import move from 'lodash-move';
import Image from 'next/image';
import { useState } from 'react';

type Card = {
  id: number;
  bankName: string;
  cardNumber: string;
  imageUrl: string;
};

interface CardSlideProps {
  cards: Card[];
  onSelect?: (card: Card) => void;
}

const CARD_OFFSET = 16;
const SCALE_FACTOR = 0.05;

export default function CardSlide({ cards: initialCards }: CardSlideProps) {
  const [cards, setCards] = useState(initialCards);

  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <div className='relative h-60 w-[80%] mx-auto flex items-center justify-center pt-10'>
      <div className='relative w-[80%] h-full'>
        <ul className='relative w-full h-full'>
          {cards.map((card, index) => {
            const canDrag = index === 0;

            return (
              <motion.li
                key={card.id}
                className='absolute w-full rounded-xl overflow-hidden list-none'
                style={{
                  cursor: canDrag ? 'grab' : 'auto',
                  transformOrigin: 'top center',
                }}
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: cards.length - index,
                }}
                drag={canDrag ? 'y' : false}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                }}
                onDragEnd={(event, info) => {
                  if (info.offset.y > 50) {
                    moveToEnd(index);
                  }
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Image
                  src={`/images/cards/${card.imageUrl}`}
                  alt={card.bankName}
                  width={192}
                  height={122}
                  className='w-full h-auto select-none'
                  priority
                  draggable={false}
                />
              </motion.li>
            );
          })}
        </ul>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-10 flex flex-col justify-center items-center'>
        <p className='text-sm font-medium text-darkGrey'>{cards[0].bankName}</p>
        <p className='text-[0.9375rem]'>{cards[0].cardNumber}</p>
      </div>
    </div>
  );
}
