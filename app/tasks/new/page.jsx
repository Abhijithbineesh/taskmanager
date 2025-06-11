'use client';

import { gql, useMutation } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADD_TASK = gql`
  mutation($title: String!, $description: String, $status: String!, $dueDate: String) {
    addTask(title: $title, description: $description, status: $status, dueDate: $dueDate) {
      id
    }
  }
`;

export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState('');
  const [addTask] = useMutation(ADD_TASK, { client });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ variables: { title, description, status, dueDate } });
    router.push('/tasks');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#161b22] border border-[#30363d] text-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Add New Task</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
