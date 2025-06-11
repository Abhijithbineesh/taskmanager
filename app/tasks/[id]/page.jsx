'use client';

import { useQuery, gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useParams } from 'next/navigation';

const GET_TASK = gql`
  query($id: ID!) {
    task(id: $id) {
      id
      title
      description
      dueDate
      status
    }
  }
`;

export default function TaskDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id },
    client,
  });

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;

  const task = data.task;

  
  const statusColor = {
    'Todo': 'bg-blue-600',
    'In Progress': 'bg-yellow-500',
    'Done': 'bg-green-600',
  }[task.status] || 'bg-gray-500';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] text-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">{task.title}</h1>
        <p className="mb-6 text-gray-300 text-lg">{task.description}</p>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${statusColor}`}>
              {task.status}
            </span>
          </div>

          <div className="text-lg text-gray-300 font-semibold">
            <span className="text-white mr-1">Due Date:</span> {task.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
}
