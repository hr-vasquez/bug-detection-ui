import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  // Determine confidence level styling
  const getConfidenceColor = (confidence: number): string => {
    if (confidence < 30) return 'text-red-500';
    if (confidence < 70) return 'text-amber-500';
    return 'text-green-500';
  };

  const getConfidenceLevel = (confidence: number): string => {
    if (confidence < 30) return 'Low';
    if (confidence < 70) return 'Medium';
    return 'High';
  };

  const confidenceColor = getConfidenceColor(result.confidence);
  const confidenceLevel = getConfidenceLevel(result.confidence);

  return (
    <div className="w-full animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            {result.isBuggy ? (
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            )}
            <h2 className="text-xl font-semibold">
              {result.isBuggy ? result.buggyFound + ' bugs of ' + result.totalFiles + ' detected' : 'No Bugs Detected'}
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Bug Confidence: <span className={`font-semibold ${confidenceColor}`}>{result.confidence}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  result.isBuggy ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-gray-500">
              Confidence Level: <span className={confidenceColor}>{confidenceLevel}</span>
            </p>
          </div>

          <button
            onClick={toggleDetails}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            <span>View Detailed Metrics</span>
            {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showDetails && (
            <div className="mt-4 animate-slideDown">
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(result.metrics).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;