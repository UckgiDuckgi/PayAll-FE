'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PayAllLogo } from '../ui/PayAllLogo';

type Team = {
  name: string;
  tel: string;
};
interface RotatingTextLogoProps {
  team: Team[];
  speed?: number; // 회전 속도 (초 단위, 기본값: 10)
  size?: number; // 로고 크기 (기본값: 100)
}

export const RotatingTextLogo = ({
  team,
  speed = 10,
  size = 100,
}: RotatingTextLogoProps) => {
  const numChars = team.length;

  return (
    <div className='relative w-full h-full flex items-center justify-center perspective-[1000px]'>
      <motion.div
        className='absolute preserve-3d'
        style={{
          width: size * 3,
          height: size * 3,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0 }}
        animate={{
          rotateY: -360,
          opacity: 1,
        }}
        transition={{
          opacity: { delay: 3, duration: 0.5 },
          rotateY: {
            delay: 3,
            duration: speed,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      >
        {team.map((t, i) => (
          <motion.span
            key={i}
            className='absolute left-1/2 top-1/4 font-bold'
            style={{
              fontSize: size / 5,
              transformOrigin: `0 0`,
              transform: `
                rotateY(${i * (360 / numChars)}deg) 
                translateZ(${size * 1.5}px)
              `,
              opacity: 0.8,
              backfaceVisibility: 'hidden',
            }}
          >
            <ProfileImage text={t.name} tel={t.tel} />
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className='relative z-10'
        style={{ width: size, height: size }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: 3,
          duration: 0.5,
        }}
      >
        <PayAllLogo />
      </motion.div>
      <style>{`
        .perspective-[1000px] {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

const ProfileImage = ({ text, tel }: { text: string; tel: string }) => {
  return (
    <div className='flex flex-col items-center justify-between min-h-[180px]'>
      <Link href={`tel:${tel}`}>
        <div className='flex items-center justify-center bg-white rounded-sm'>
          <Image
            src={`/images/teammates/${text}.jpeg`}
            width={100}
            height={100}
            alt={text}
            priority
            className='p-1'
          />
        </div>
      </Link>
      <span className='text-xl font-bold'>{text}</span>
    </div>
  );
};
