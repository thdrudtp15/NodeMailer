'use client';

import { useState } from 'react';
import { MailContentType } from '@/types/mail';

const defaultContent: MailContentType = {
    title: '',
    from: '',
    content: '',
    file: '',
};

export default function Home() {
    const [file, setFile] = useState<string | undefined>();
    const [content, setContent] = useState<MailContentType>(defaultContent);

    /**
     * 인풋 작성 내용 변경
     */
    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setContent((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * 이미지 마운트
     */
    const onMountImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        if (e.target.files[0].type) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    let base64Sub = base64.toString();
                    setFile(base64Sub);
                }
            };
        } else {
            alert('파일 형식이 잘못됨.');
        }
    };

    /**
     * 서버 요청
     */
    const onSubmit = async () => {
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                body: JSON.stringify({ ...content, file }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
        } catch (e) {
            console.log(e);
            alert('에러 발생');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-content bg-gray-200 gap-5 rounded-2xl p-4">
            <h1>1 : 1 문의하기</h1>
            <label className="flex justify-between items-center">
                <h2 className="w-20">제목</h2>
                <input type="text" name="title" onChange={onChangeContent} />
            </label>
            <label className="flex justify-between items-center">
                <h2 className="w-20">문의내용</h2>
                <textarea name="content" onChange={onChangeContent} />
            </label>
            <label className="flex justify-between items-center">
                <h2 className="w-20">이메일</h2>
                <input type="text" name="from" onChange={onChangeContent} />
            </label>
            <label className="flex justify-between items-center">
                <h2 className="w-full">첨부 파일</h2>
                <input className="hidden" type="file" accept="image/*" name="file" onChange={onMountImg} />
                {/* {file && <img src={file} />} */}
            </label>
            <button className="rounded-xl bg-green-400 w-full h-10" onClick={() => onSubmit()}>
                작성완료
            </button>
        </div>
    );
}
