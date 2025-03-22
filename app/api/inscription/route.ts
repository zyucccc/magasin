/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createUser } from '@/app/backend/controllers/userController';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // check if all required fields are provided
        if (!body.email || !body.password || !body.nom || !body.prenom) {
            return NextResponse.json(
                { error: 'please fill all the vacancy' },
                { status: 400 }
            );
        }

        // create user
        const newUser = await createUser(body);

        return NextResponse.json(
            {
                message: 'inscription successful',
                user: { email: newUser.email }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('inscription failed:', error);

        if (error.message === 'email used') {
            return NextResponse.json(
                { error: 'email used' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'inscription failed' },
            { status: 500 }
        );
    }
}