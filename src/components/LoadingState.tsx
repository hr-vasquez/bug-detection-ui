import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Analyzing your file...' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-blue-200"></div>
        <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-700 font-medium">{message}</p>
      <p className="text-sm text-gray-500 mt-1">This may take a moment</p>
    </div>
  );
};

export default LoadingState;