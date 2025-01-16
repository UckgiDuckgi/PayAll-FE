import Image from 'next/image';
import Link from 'next/link';

const CART_CTN = 1;

function Header() {
  return (
    <header className='z-50 mx-auto fixed top-0 w-full max-w-[512px] flex justify-between items-center pt-4 pb-3 px-8 bg-background'>
      <Link href='/'>
        <Image src='/images/logo.png' alt='logo' width={50} height={15} />
      </Link>
      <HeaderCart />
    </header>
  );
}

const HeaderCart = () => {
  return (
    <div className='flex items-center'>
      <Link href='/cart'>
        <Image src='/icons/headerCart.svg' alt='cart' width={26} height={26} />
        <span className='text-black bg-white rounded-full w-[0.875rem] h-[0.875rem] flex justify-center items-center text-[0.625rem] font-bold absolute top-4 right-6'>
          {CART_CTN}
        </span>
      </Link>
    </div>
  );
};

export default Header;
