export interface Metric {
  label: string;
  value: string;
  isPrivate: boolean;
}

export interface StartupProfile {
  id: string;
  name: string;
  logo: string;
  oneLiner: string;
  description: string;
  stage: string;
  tags: string[];
  founderIds: string[];
  publicMetrics: Metric[];
  privateMetrics: Metric[];
}
