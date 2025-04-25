import React, { useCallback, useState } from 'react';
import { Upload, FileX, File as FileIcon } from 'lucide-react';
import { FileInfo } from '../types';
import { validateCSVFile } from '../utils/csvAnalyzer';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: FileInfo | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!validateCSVFile(file)) {
      setError('Please upload a valid CSV file');
      return;
    }
    
    setError(null);
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full mb-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : selectedFile 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          {selectedFile ? (
            <div className="flex flex-col items-center animate-fadeIn">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <FileIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{selectedFile.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{formatFileSize(selectedFile.size)}</p>
              <p className="text-xs text-gray-400 mt-2">Click or drag to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Upload className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Upload CSV File</h3>
              <p className="text-sm text-gray-500 mt-1">Drag and drop, or click to select</p>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="flex items-center mt-2 text-red-500 text-sm animate-fadeIn">
          <FileX className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;