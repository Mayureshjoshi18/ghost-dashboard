export interface WebhookPayload {
  timestamp: string;
  employee_email: string;
  service_detected: string;
  risk_level: 'Low' | 'Medium' | 'High';
}
