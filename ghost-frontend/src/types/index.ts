export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface SaaSRecord {
  id: number;
  timestamp: string;
  employee_email: string;
  service_detected: RiskLevel;
  risk_level: string;
}