import React from 'react';

interface FilterBarProps {
  employees: string[];
  services: string[];
  selectedEmployee: string;
  selectedService: string;
  onEmployeeChange: (value: string) => void;
  onServiceChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  employees,
  services,
  selectedEmployee,
  selectedService,
  onEmployeeChange,
  onServiceChange,
}) => {
  return (
    <div className="flex gap-4 mb-4">
      <select
        value={selectedEmployee}
        onChange={(e) => onEmployeeChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option className='text-color-black' value="">All Employees</option>
        {employees.map((emp) => (
          <option className='text-color-black' key={emp} value={emp}>
            {emp}
          </option>
        ))}
      </select>

      <select
        value={selectedService}
        onChange={(e) => onServiceChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option className='text-color-black' value="">All Services</option>
        {services.map((svc) => (
          <option className='text-color-black' key={svc} value={svc}>
            {svc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
