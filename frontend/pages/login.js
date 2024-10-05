// pages/login.js
import { useState } from 'react';
import axios from '../utils/axiosConfig';  // 修正箇所
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('ログイン中にエラーが発生しました。');
      }
    }
  };

  return (
    
    <div className="bg-login-bg bg-cover bg-center min-h-screen w-full flex items-center justify-center overflow-x-hidden">
      <div className="bg-white bg-opacity-80 p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">ユーザー名:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">パスワード:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
