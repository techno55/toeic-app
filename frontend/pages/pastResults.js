// pages/pastResults.js

import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { Bar } from 'react-chartjs-2';
import { useRouter } from 'next/router';
import 'chart.js/auto';
import { Chart } from 'chart.js';

export default function PastResults() {
  const [testResults, setTestResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPastResults = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/past_results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestResults(response.data.test_results);
      } catch (error) {
        console.error('試験結果の取得に失敗しました:', error);
        router.push('/login');
      }
    };

    fetchPastResults();
  }, [router]);

  const data = {
    labels: testResults.map((test, index) => `テスト ${index + 1}`),
    datasets: [
      {
        label: 'スコア',
        data: testResults.map((test) => test.score),
        backgroundColor: 'rgba(255, 140, 0, 0.8)', // 濃いオレンジ色
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max:
          testResults.length > 0
            ? Math.max(...testResults.map((t) => t.total_questions))
            : 10,
        ticks: {
          color: '#000000', // Y軸の目盛りの色を黒に設定
        },
        grid: {
          color: '#000000', // Y軸のグリッドラインの色を黒に設定
        },
        border: {
          color: '#000000', // Y軸の線の色
        },
      },
      x: {
        ticks: {
          color: '#000000', // X軸の目盛りの色を黒に設定
        },
        grid: {
          color: '#000000', // X軸のグリッドラインの色を黒に設定
        },
        border: {
          color: '#000000', // X軸の線の色
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000000', // 凡例の文字色を黒に設定
        },
      },
      title: {
        display: true,
        text: '過去の試験結果',
        color: '#000000', // タイトルの文字色を黒に設定
        font: {
          size: 18,
        },
      },
    },
  };

  // 背景色を設定するカスタムプラグインを登録
  Chart.register({
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext('2d');
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#f0f0f0'; // 背景色を薄いグレーに設定
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  });

  const goBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">過去の試験結果</h2>
          {testResults.length > 0 ? (
            <Bar data={data} options={options} />
          ) : (
            <p>過去の試験結果がありません。</p>
          )}
          <button
            onClick={goBack}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            ダッシュボードに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
