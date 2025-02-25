import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/db'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ 
    message: 'Login successful',
    user: { id: user.id, email: user.email }
  })
}
