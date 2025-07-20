import { SaaSRecord } from '../types';

function downloadFile(data: string, filename: string, type: string) {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToCSV(records: SaaSRecord[], filename: string) {
  const header = 'Service,Detected By,Risk Level,Timestamp';
  const rows = records.map(r =>
    [
      `"${r.service_detected}"`,
      `"${r.employee_email}"`,
      `"${r.risk_level}"`,
      `"${new Date(r.timestamp).toISOString()}"`
    ].join(',')
  );
  const csv = [header, ...rows].join('\n');
  downloadFile(csv, filename, 'text/csv');
}

export function exportToJSON(records: SaaSRecord[], filename: string) {
  const json = JSON.stringify(records, null, 2);
  downloadFile(json, filename, 'application/json');
}
