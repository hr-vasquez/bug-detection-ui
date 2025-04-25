import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import LoadingState from './components/LoadingState';
import { FileInfo, AnalysisResult } from './types';
import { analyzeCSV } from './utils/csvAnalyzer';

function App() {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setFile(file);
    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type
    });
    
    // Reset previous results when a new file is selected
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a CSV file first');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = await analyzeCSV(file);
      setAnalysisResult(result);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500 mb-4">
          <img src={"/images/dataset-cover.jpg"} style={{ width: 'auto', height: '150px' }} alt={"https://www.kaggle.com/datasets/vellyy/bug-hunter"} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bug Detection Model</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Upload your CSV file, analyze for bugs, and get detailed metrics with confidence scores.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
          <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
          
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                !selectedFile || isAnalyzing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              style={{ minWidth: '160px' }}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze CSV'}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
              {error}
            </div>
          )}
        </div>

        {isAnalyzing && <LoadingState />}

        {analysisResult && !isAnalyzing && (
          <AnalysisResults result={analysisResult} />
        )}
      </div>
    </div>
  );
}

export default App;