// pages/dashboard.js

import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/user_info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.username);
        setMessage(`${response.data.username}さん、ようこそ！`);
      } catch (error) {
        setMessage('認証が必要です。ログインしてください。');
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    fetchUserInfo();
  }, [router]);

  const startStudy = () => {
    router.push('/study');
  };

  const viewPastResults = () => {
    router.push('/pastResults');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">ダッシュボード</h2>
      <p>{message}</p>
      <button
        onClick={startStudy}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2"
      >
        テストを受ける
      </button>
      <button
        onClick={viewPastResults}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
      >
        過去の試験結果を見る
      </button>
    </div>
  );
}
