import { Attachment } from 'nodemailer/lib/mailer';

export type MailContentType = {
    from: string;
    title: string;
    content: string;
    file?: string; // 첨부파일을 위한 값
};

export type MailOptionType = {
    to: string;
    from: string;
    subject: string;
    attachments?: Attachment[]; // 첨부파일을 위한 값.
    html: string;
};
