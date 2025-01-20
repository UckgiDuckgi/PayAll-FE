import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const response = await fetch('https://payall.topician.com/api/ocr', {
      method: 'POST',
      body: formData,
      headers: {
        Origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('OCR API error:', error);
    return NextResponse.json(
      { error: 'Failed to process OCR request' },
      { status: 500 }
    );
  }
}
