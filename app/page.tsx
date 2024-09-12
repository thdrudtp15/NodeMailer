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
        const response = await fetch('/api/send', {
            method: 'POST',
            body: JSON.stringify({ ...content, file }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data?.message);
        } else {
            alert('이메일 전송 성공');
        }
    };

    return (
        <div className="container">
            <h1>이메일 전송</h1>
            <label className="input-box">
                <h2 className="w-20">제목 * </h2>
                <input type="text" name="title" onChange={onChangeContent} placeholder="제목을 작성해주세요" />
            </label>
            <label className="input-box">
                <h2 className="w-20">문의내용 *</h2>
                <textarea name="content" onChange={onChangeContent} placeholder="문의 내용을 작성해주세요" />
            </label>
            <label className="input-box">
                <h2 className="w-20">이메일 *</h2>
                <input type="text" name="from" onChange={onChangeContent} placeholder="회신받을 이메일" />
            </label>
            <label className="input-box">
                <h2 className="w-full">첨부 파일</h2>
                <input className="hidden" type="file" accept="image/*" name="file" onChange={onMountImg} />
                {file && <img className="prv-img" src={file} alt="preview image" />}
            </label>
            <button className="submit-btn" onClick={() => onSubmit()}>
                작성완료
            </button>
        </div>
    );
}
