const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ScanResponse {
  scan_id: string;
  status: string;
}

export interface ScanIssue {
  id: string;
  type: string;
  severity: string;
  category: string;
  description: string;
  wcag_criterion: string | null;
  element_selector: string | null;
  screenshot_url: string | null;
  bounding_box: string | null;
}

export interface ScanStatusResponse {
  scan_id: string;
  url: string;
  status: string;
  issues_found: number;
  compliance_score: number | null;
  aio_score: number | null;
  include_aio: boolean;
  aio_available: boolean;
  error_message: string | null;
  sample_issues: ScanIssue[] | null;
}

export interface ReportResponse {
  status: string;
  message: string;
}

export async function startScan(
  url: string
): Promise<ScanResponse> {
  const res = await fetch(`${API_URL}/api/v1/scan/quick`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, include_aio: true }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to start scan");
  }
  return res.json();
}

export async function getScanStatus(
  scanId: string
): Promise<ScanStatusResponse> {
  const res = await fetch(`${API_URL}/api/v1/scan/${scanId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch scan status");
  }
  return res.json();
}

export async function requestReport(
  scanId: string,
  email: string,
  platform?: string
): Promise<ReportResponse> {
  const body: Record<string, string> = { email, report_type: "full" };
  if (platform) {
    body.platform_selected = platform;
  }
  const res = await fetch(`${API_URL}/api/v1/scan/${scanId}/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to request report");
  }
  return res.json();
}
