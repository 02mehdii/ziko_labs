import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    await request.json() // Will be used for validation later
    // TODO: Add proper validation and database storage
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}