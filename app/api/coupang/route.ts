import {
  coupangAddCart,
  //   coupangClose,
  coupangGetPincode,
  coupangInsertPassword,
  coupangPayAll,
  coupangSetPincode,
  coupangSignIn,
} from '@/actions/coupang/coupangActions';
import { NextResponse } from 'next/server';

export type Item = {
  productId: string;
  itemId?: string;
  quantity: number;
};

export type CoupangRequest = {
  pincode: string;
  password: string;
  itemList: Item[];
};

export type CoupangResponse = {
  success: boolean;
  status: 'PINCODE' | 'PASSWORD' | 'COMPLETED';
  result: string;
};

export async function POST(request: Request) {
  const { pincode, password, itemList } =
    (await request.json()) as CoupangRequest;

  await coupangSignIn();

  const isPincodePage = await coupangGetPincode();
  if (isPincodePage) {
    return NextResponse.json({
      success: true,
      status: 'PINCODE',
      result: 'PINCODE',
    });
  }

  await coupangSetPincode(pincode);
  await coupangAddCart(itemList[0]);
  // await coupangAddCart(itemList[1]);

  const screenshotBuffer = await coupangPayAll();
  if (screenshotBuffer) {
    const base64Image = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
    return NextResponse.json({
      success: true,
      status: 'PASSWORD',
      result: base64Image,
    });
  }

  await coupangInsertPassword(password);

  //   await coupangClose();

  return NextResponse.json({
    success: true,
    status: 'COMPLETED',
    result: '',
  });
}
