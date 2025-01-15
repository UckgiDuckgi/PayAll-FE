import Image from 'next/image';

const CART_CTN = 1;

function Header() {
  return (
    <header className='z-50 mx-auto fixed top-0 w-full max-w-[512px] flex justify-between items-center pt-4 pb-2 px-8 bg-background'>
      <Image src='/images/logo.png' alt='logo' width={50} height={15} />
      <HeaderCart />
    </header>
  );
}

const HeaderCart = () => {
  return (
    <div className='flex items-center'>
      <Image src='/icons/headerCart.svg' alt='cart' width={26} height={26} />
      <span className='text-black bg-white rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold absolute top-6 right-5'>
        {CART_CTN}
      </span>
    </div>
  );
};

export default Header;
