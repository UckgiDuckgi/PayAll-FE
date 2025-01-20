import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const contentType = request.headers.get('content-type');

    const response = await fetch('https://payall.topician.com/api/ocr', {
      method: 'POST',
      body: formData,
      headers: {
        Origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        'Content-Type': contentType || 'multipart/form-data',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        Accept: 'application/json',
        Referer: 'https://payall.topician.com/details/receipt',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('OCR API error:', error);
    return NextResponse.json(
      { error: 'Failed to process OCR request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
