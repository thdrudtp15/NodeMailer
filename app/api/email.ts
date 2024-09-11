import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { MailContentType } from '@/types/mail';
import { MailOptionType } from '@/types/mail';

/**
 * 노드메일러 설정 누가 받을 지
 */
const transporter = nodemailer?.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_APP_EMAIL,
        pass: process.env.NEXT_APP_PWD,
    },
});

/**
 *  이메일 보내는 부분
 */
export function sendEmail({ from, title, content, file }: MailContentType) {
    const mailOptions: MailOptionType = {
        to: process.env.NEXT_APP_EMAIL || '',
        from,
        subject: `[ 1 : 1 문의 ] ${title}`,
        attachments: [{ path: file }],
        html: `
                <h1>${title}</h1>
                <div>${content}</div>
                </br>
                <p>보낸 사람 : ${from}</p>
            `,
    };
    return transporter.sendMail(mailOptions);
}
