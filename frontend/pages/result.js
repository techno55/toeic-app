// pages/result.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const { data } = router.query;
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (data) {
      setResultData(JSON.parse(data));
    }
  }, [data]);

  if (!resultData) {
    return <div>結果を読み込んでいます...</div>;
  }

  const goBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">結果</h2>
          <p className="mb-4">
            スコア: {resultData.score} / {resultData.total}
          </p>
          {resultData.results.map((result) => (
            <div key={result.question_id} className="mb-6">
              <p className="font-bold">{result.question_text}</p>
              <p>
                あなたの回答: {result.selected_choice}{' '}
                {result.is_correct ? '✅' : '❌'}
              </p>
              <p>正解: {result.correct_choice}</p>
              <p className="text-gray-700 mt-2">解説: {result.explanation}</p>
            </div>
          ))}
          <button
            onClick={() => router.push('/study')}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2"
          >
            もう一度挑戦する
          </button>
          <button
            onClick={goBack}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            ダッシュボードに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
