'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SendWebhookForm() {
  const [formData, setFormData] = useState({
    service_detected: '',
    employee_email: '',
    risk_level: 'Low',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch('http://localhost:3001/webhook/new-saas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success('Webhook sent successfully!');
    } else {
      toast.error('Failed to send webhook.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 bg-black border-white border rounded-lg"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            name="service_detected"
            value={formData.service_detected}
            onChange={handleChange}
            placeholder="Service Detected"
            className="w-full p-2 border border-white rounded bg-black text-white placeholder-white"
            required
          />
        </div>

        <div className="flex-1">
          <input
            type="email"
            name="employee_email"
            value={formData.employee_email}
            onChange={handleChange}
            placeholder="Employee Email"
            className="w-full p-2 border border-white rounded bg-black text-white placeholder-white"
            required
          />
        </div>

        <div className="flex-1">
          <select
            name="risk_level"
            value={formData.risk_level}
            onChange={handleChange}
            className="w-full p-2 border border-white rounded text-white"
          >
            <option value="Low" className="text-black">Low</option>
            <option value="Medium" className="text-black">Medium</option>
            <option value="High" className="text-black">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
          Send Webhook
        </button>
      </div>
    </form>
  );
}