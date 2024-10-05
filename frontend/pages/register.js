import { useState } from 'react';
import axios from '../utils/axiosConfig';  // 修正箇所

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z\d]{8,128}$/;  // 英数字のみ
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateUsername(username)) {
      setUsernameError('ユーザー名は3～20文字の英数字またはアンダースコアのみ使用できます。');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('パスワードは8～128文字で、英数字のみ使用できます。');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          username,
          password,
        }
      );
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('登録中にエラーが発生しました。');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      
      <form onSubmit={handleRegister}>
        <div>
          <label style={{ fontWeight: 'bold', fontSize: '30px' }}>ユーザー名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-black rounded"
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <small style={{ color: 'black' , fontWeight: 'bold', fontSize: '16px'}}>
            ※ 3～20文字の英数字またはアンダースコア
          </small>
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        <div>
          <label style={{ fontWeight: 'bold', fontSize: '30px'}}>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-black rounded"
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <small style={{ color: 'black', fontWeight: 'bold', fontSize: '16px'}}>
            ※ 8～128文字で、英数字のみ使用できます。
          </small>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        
        <div style={{ height: '100px' }}></div>  

        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            width: '100%', 
            border: '2px solid black',   // 黒い枠線
            backgroundColor: '#70db70',    // 緑色の背景
            color: 'white',              // ボタン内のテキストを白に
            borderRadius: '5px',         // 角を丸くする
            cursor: 'pointer',            // ホバー時にカーソルが変わる
            fontWeight: 'bold',
            fontSize:30
          }}
        >
          登録する
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
