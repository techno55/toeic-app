import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';  // 修正箇所
import { useRouter } from 'next/router';

export default function StudyPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('問題の取得に失敗しました:', error);
        setMessage('問題の取得に失敗しました。ログインし直してください。');
      }
    };

    fetchQuestions();
  }, [router]);

  const handleChoiceSelect = (questionId, choice) => {
    setSelectedChoices({
      ...selectedChoices,
      [questionId]: choice,
    });
  };

  const handleNext = () => {
    if (!selectedChoices[questions[currentQuestionIndex].id]) {
      setMessage('回答を選択してください。');
      return;
    }
    setMessage('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitAnswers();
    }
  };

  const handleSubmitAnswers = async () => {
    const token = localStorage.getItem('token');
    const answers = {};
    questions.forEach((question) => {
      answers[question.id] = selectedChoices[question.id];
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/submit_answers`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 結果ページに移動
      router.push({
        pathname: '/result',
        query: { data: JSON.stringify(response.data) },
      });
    } catch (error) {
      console.error('回答の送信に失敗しました:', error);
      setMessage('回答の送信に失敗しました。');
    }
  };

  if (questions.length === 0) {
    return <div>問題を読み込んでいます...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedChoice = selectedChoices[currentQuestion.id];

    return (
        <div className="bg-gray-100 min-h-screen">
        <div className="max-w-xl mx-auto p-4">
            <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">
                問題 {currentQuestionIndex + 1} / {questions.length}
            </h2>
            <p className="mb-4">{currentQuestion.text}</p>
            <div className="mb-4">
                {currentQuestion.choices.map((choice) => (
                <div key={choice} className="mb-2">
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={choice}
                        checked={selectedChoice === choice}
                        onChange={() => handleChoiceSelect(currentQuestion.id, choice)}
                        className="mr-2"
                    />
                    {choice}
                    </label>
                </div>
                ))}
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <button
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                {currentQuestionIndex < questions.length - 1 ? '次へ' : '結果を見る'}
            </button>
            </div>
        </div>
        </div>
    );
    }