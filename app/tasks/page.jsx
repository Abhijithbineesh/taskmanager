'use client';

import { useQuery, gql, useMutation } from '@apollo/client';
import client from '@/lib/apollo-client';
import Link from 'next/link';
import StatusDropdown from '@/components/StatusDropdown';

const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      dueDate
      status
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
  client,
  fetchPolicy: 'network-only', 
});
  const [updateStatus] = useMutation(UPDATE_STATUS, { client });

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus({ variables: { id, status: newStatus } });
    refetch();
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-white">🗂️ Your Tasks</h1>
        <Link
          href="/tasks/new"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition-all shadow-md"
        >
          + Add Task
        </Link>
      </div>

      <div className="space-y-5">
        {data.tasks.map(task => (
          <div
            key={task.id}
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <Link
                href={`/tasks/${task.id}`}
                className="text-xl font-semibold text-white hover:underline"
              >
                {task.title}
              </Link>
              <StatusDropdown
                current={task.status}
                onChange={val => handleStatusChange(task.id, val)}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">📅 Due: {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
