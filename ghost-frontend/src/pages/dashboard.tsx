'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SaasTable from '../components/SaasTable';
import FilterBar from '../components/FilterBar';
import TestWebhook from '../components/TestWebhook';
import LogoutButton from '../components/LogoutButton';
import { SaaSRecord } from '../types';

export default function Dashboard() {
  const [data, setData] = useState<SaaSRecord[]>([]);
  const [filteredData, setFilteredData] = useState<SaaSRecord[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetch('http://localhost:3001/webhook/all')
      .then((res) => res.json())
      .then((records) => {
        setData(records);
        setFilteredData(records);
      });
  }, []);

  useEffect(() => {
    const result = data.filter(
      (record) =>
        (selectedEmployee === '' || record.employee_email === selectedEmployee) &&
        (selectedService === '' || record.service_detected === selectedService)
    );
    setFilteredData(result);
  }, [selectedEmployee, selectedService, data]);

  const employees = [...new Set(data.map((r) => r.employee_email))];
  const services = [...new Set(data.map((r) => r.service_detected))];
  if (isLoading) return <p className="p-4 text-white">Checking auth...</p>;


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Ghost Watchlist Dashboard</h1>
        <LogoutButton />
      </div>
      <FilterBar
        employees={employees}
        services={services}
        selectedEmployee={selectedEmployee}
        selectedService={selectedService}
        onEmployeeChange={setSelectedEmployee}
        onServiceChange={setSelectedService}
      />
      <TestWebhook />
      <SaasTable records={filteredData} />
    </div>
  );
}