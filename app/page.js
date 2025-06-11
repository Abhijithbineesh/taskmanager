// app/welcome/page.jsx
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-500 mb-6">Task Manager</h1>
      <Link
        href="/tasks"
        className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold transition"
      >
        Go to Tasks
      </Link>
    </div>
  );
}
