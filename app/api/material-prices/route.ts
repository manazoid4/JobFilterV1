import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    results: [
      { id: '1', item: 'Copper Pipe 15mm', price: 3.45, unit: 'm', trend: 'up' },
      { id: '2', item: 'Plasterboard 2.4m', price: 12.99, unit: 'sheet', trend: 'down' },
      { id: '3', item: 'Cement 25kg', price: 8.50, unit: 'bag', trend: 'stable' }
    ]
  });
}
