/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyUser } from '@/app/backend/controllers/userController';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // check if all required fields are provided
        if (!body.email || !body.password) {
            return NextResponse.json(
                { error: 'please fill email and mdp' },
                { status: 400 }
            );
        }

        //controller
        const user = await verifyUser(body.email, body.password);

        if (!user) {
            return NextResponse.json(
                { error: 'user doesnt exist or mdp is not correct' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: 'login successful',
                user: { email: user.email }  // 只返回email给前端
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('login failed:', error);

        return NextResponse.json(
            { error: 'login failed' },
            { status: 500 }
        );
    }
}