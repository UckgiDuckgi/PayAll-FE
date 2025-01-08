import axios from 'axios';
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
  } catch (error: any) {
    console.error('OCR API Error:', error.response?.data || error.message);
    return NextResponse.json(
      {
        error: 'OCR request failed',
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
