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
            const response = await fetch('/api/get', {
                method: 'POST',
                body: JSON.stringify({ ...content, file }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
        } catch (e) {
            alert('에러 발생');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1>1 : 1 문의하기</h1>
            <div className="flex gap-20">
                <h2>제목</h2>
                <input type="text" name="title" onChange={onChangeContent} />
            </div>
            <div className="flex gap-20">
                <h2>문의내용</h2>
                <textarea name="content" onChange={onChangeContent} />
            </div>
            <div className="flex gap-20">
                <h2>이메일</h2>
                <input type="text" name="from" onChange={onChangeContent} />
            </div>
            <div className="flex gap-20">
                <h2>첨부 파일</h2>
                <input type="file" accept="image/*" name="file" onChange={onMountImg} />
                {/* {file && <img src={file} />} */}
            </div>
            <button onClick={() => onSubmit()}>작성완료</button>
        </div>
    );
}
