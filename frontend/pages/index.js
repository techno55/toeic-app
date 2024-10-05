// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">TOEIC学習アプリへようこそ！</h1>
      <p className="mb-6">
        このアプリでは、模試の受験や復習機能を利用して、効率的にTOEICの勉強ができます。
      </p>
      <Link href="/login">
        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
          ログイン
        </button>
      </Link>
      <Link href="/register">
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          新規登録
        </button>
      </Link>
    </div>
  );
}
  