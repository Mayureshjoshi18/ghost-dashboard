'use client';

import { useEffect, useState } from 'react';
import { SaaSRecord } from '../types';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { exportToCSV, exportToJSON } from '../utils/export';

const riskColors = {
  Low: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

type Props = {
  records: SaaSRecord[];
};

export default function SaasTable({ records }: Props) {
  const [filter, setFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(false);
  const [sortedRecords, setSortedRecords] = useState(records);

  useEffect(() => {
    setSortedRecords(records);
  }, [records]);

  const handleSort = () => {
    const sorted = [...sortedRecords].sort((a, b) =>
      sortAsc
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setSortAsc(!sortAsc);
    setSortedRecords(sorted);
  };

  const filtered = sortedRecords.filter(
    r =>
      r.employee_email.toLowerCase().includes(filter.toLowerCase()) ||
      r.service_detected.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Filter by employee or service"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
        <button
          onClick={handleSort}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Sort by Timestamp {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      <div className="flex gap-2 justify-start mb-2 height-40">
            <button
                onClick={() => exportToCSV(filtered, 'filtered_services.csv')}
                className="px-4 py-1 text-sm bg-blue-700 text-white rounded hover:bg-blue-800"
            >
                Export CSV
            </button>
            <button
                onClick={() => exportToJSON(filtered, 'filtered_services.json')}
                className="px-4 py-1 text-sm bg-green-700 text-white rounded hover:bg-green-800"
            >
                Export JSON
            </button>
      </div>


      <div className="overflow-auto">
        <table className="min-w-full text-sm border rounded shadow bg-white text-color-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">Service</th>
              <th className="text-left p-2 border">Detected By</th>
              <th className="text-left p-2 border">Risk</th>
              <th className="text-left p-2 border">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 border">{r.service_detected}</td>
                <td className="p-2 border">{r.employee_email}</td>
                <td className="p-2 border">
                  <span
                        className={clsx(
                            'px-2 py-1 rounded text-xs font-medium',
                            riskColors[r.risk_level as keyof typeof riskColors]
                        )}
                        >
                        {r.risk_level}
                  </span>
                </td>
                <td className="p-2 border">
                  {new Date(r.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}