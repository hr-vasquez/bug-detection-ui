export interface FileInfo {
  name: string;
  size: number;
  type: string;
}

export interface AnalysisResult {
  buggyFound: number;
  totalFiles: number;
  isBuggy: boolean;
  confidence: number;
  metrics: {
    [key: string]: number | string;
  };
}