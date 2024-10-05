// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          TOEIC App
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="mx-2">
                ダッシュボード
              </Link>
              <button onClick={handleLogout} className="mx-2">
                ログアウト
              </button>
            </>
          ) : (
            <>
              {/* 正しいコード例 */}
              <Link href="/login" className="mx-2">
                ログイン
              </Link>

              <Link href="/register" className="mx-2">
                登録
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
