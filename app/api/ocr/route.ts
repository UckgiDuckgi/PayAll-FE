import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    const response = await axios.post(process.env.OCR_INVOKE_URL!, formData, {
      headers: {
        'X-OCR-SECRET': process.env.OCR_SECRET,
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      'OCR API Error:',
      axiosError.response?.data || axiosError.message
    );
    return NextResponse.json(
      {
        error: 'OCR request failed',
        details: axiosError.response?.data || axiosError.message,
      },
      { status: 500 }
    );
  }
}
