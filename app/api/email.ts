import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

/**
 * 노드메일러 설정
 */
const transporter = nodemailer?.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_EMAIL,
        pass: process.env.NEXT_PWD,
    },
});

type ContactType = {
    from: string;
    title: string;
    content: string;
    file?: string; // 첨부파일을 위한 값
};

type MailOptionType = {
    to: string;
    from: string;
    subject: string;
    attachments?: Attachment[]; // 첨부파일을 위한 값.
    html: string;
};

/**
 *  이메일 보내는 부분
 */
export function sendEmail({ from, title, content, file }: ContactType) {
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
