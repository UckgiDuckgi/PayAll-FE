import { getDanawaActions } from '@/actions/danawa/danawaActions';
import { NextResponse } from 'next/server';

export type PcodeRequest = {
  url: string;
};

export type PcodeResponse = {
  success: boolean;
  status: 'Success' | 'Fail';
  result: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') ?? '';
  try {
    const danawaActions = await getDanawaActions({ url });

    const html = await danawaActions.getPcode();

    await danawaActions.close();

    return NextResponse.json({
      success: true,
      status: 'Success',
      result: html,
    } as PcodeResponse);
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      success: false,
      status: 'Fail',
      result: 'pcode 받아오기 실패',
    } as PcodeResponse);
  }
}
