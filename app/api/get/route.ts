import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../email';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    return sendEmail(body)
        .then(() => {
            return NextResponse.json({ message: '이메일 전송 성공' }), { status: 200 };
        })
        .catch((e) => {
            console.log(e);
            return NextResponse.json({ message: '이메일 전송 실패' }), { status: 500 };
        });
};
