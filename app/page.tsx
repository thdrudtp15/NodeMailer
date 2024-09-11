export default function Home() {
    return (
        <div className="">
            <h1>1 : 1 문의하기</h1>
            <form method="post" action={''}>
                <div className="flex gap-20">
                    <h2>제목</h2>
                    <input type="text" name="title" />
                </div>
                <div className="flex gap-20">
                    <h2>문의내용</h2>
                    <textarea name="content" />
                </div>
                <div className="flex gap-20">
                    <h2>이메일</h2>
                    <input type="text" name="email" />
                </div>
                <div className="flex gap-20">
                    <h2>첨부 파일</h2>
                    <input type="file" accept="image/*" name="file" />
                </div>
                <button>작성완료</button>
            </form>
        </div>
    );
}
