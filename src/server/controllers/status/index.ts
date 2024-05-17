
import { NextResponse, NextRequest } from 'next/server';

export const StatusController = async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());

  return NextResponse.json({ message: 'Hello World', params: params});
}