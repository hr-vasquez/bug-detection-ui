import { AnalysisResult } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5000';

// This is a mock analyzer function that would be replaced with actual analysis logic
export const analyzeCSV = async (file: File): Promise<AnalysisResult> => {

  // Simulate analysis time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const formData = new FormData();
  formData.append('file', file);

  const requestOptions = {
    method: 'POST',
    body: formData
  };
  const response = await fetch(BACKEND_URL + '/predict', requestOptions)
      .then(response => response.json());

  console.log(response);

  const data = await response.data;
  
  // Mock analysis result
  // In a real application, this would perform actual CSV parsing and analysis
  const randomConfidence = data.confidence;
  return {
    isBuggy: data.bugs_detected > 0,
    buggyFound: data.bugs_detected,
    totalFiles: data.total_files,
    confidence: parseFloat(randomConfidence.toFixed(2)),
    metrics: {
      'Accuracy': data.accuracy,
      'Recall': data.recall,
      'F1-Score': data.f1_score,
      'Precision': data.precision
    }
  };
};

export const validateCSVFile = (file: File): boolean => {
  return file.type === 'text/csv' || file.name.endsWith('.csv');
};