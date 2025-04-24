'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = async () => {
    try {
      const res = await fetch('https://spellcheck-api-production.up.railway.app/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.result);  // 교정된 문장은 아래에 따로 표시
    } catch (error) {
      console.error('맞춤법 검사 중 오류 발생:', error);
      setResult('⚠️ 서버와 통신에 실패했습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">맞춤법 검사기</h1>

        <textarea
          className="w-full h-40 border p-2 rounded resize-none placeholder-gray-600 text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="검사할 문장을 입력하세요"
        />

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCheck}
        >
          검사하기
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-300">
            <h2 className="font-semibold mb-2 text-gray-800">교정된 문장:</h2>
            <p className="text-black whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
