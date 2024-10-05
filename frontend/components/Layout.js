import Navbar from './Navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  // ログインページかどうかを判定
  const isLoginPage = router.pathname === '/login';

  return (
    <div
      className={`min-h-screen flex flex-col ${
        !isLoginPage ? 'bg-base-bg bg-cover bg-center' : ''
      }`}
    >
      <Navbar />
      <main className="flex-grow container mx-auto px-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; 2024 TOEIC App
      </footer>
    </div>
  );
}
