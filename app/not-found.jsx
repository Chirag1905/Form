'use client'

import Link from 'next/link';
import { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  useEffect(() => {
    document.documentElement.style.setProperty('--animate-duration', '2s');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 animate__animated animate__fadeInDown">
      <FaExclamationTriangle className="text-6xl text-red-600 mb-4 animate__animated animate__shakeY" />
      <h1 className="text-6xl font-bold mb-4 animate__animated animate__tada">404</h1>
      <p className="mb-8 text-xl animate__animated animate__jackInTheBox">Page Not Found</p>
      <Link href="/">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 animate__animated animate__wobble">
          Go back to Home
        </button>
      </Link>
    </div>
  );
}
