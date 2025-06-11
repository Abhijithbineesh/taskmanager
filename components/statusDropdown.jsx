'use client';

export default function StatusDropdown({ current, onChange }) {
  return (
    <select
      className="bg-[#161b22] text-white px-4 py-2 rounded-lg border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
      value={current}
      onChange={e => onChange(e.target.value)}
    >
      {['Todo', 'In Progress', 'Done'].map(status => (
        <option
          key={status}
          value={status}
          className="bg-[#0d1117] text-white"
        >
          {status}
        </option>
      ))}
    </select>
  );
}

