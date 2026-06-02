import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Fetching your saved posts..." }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white fixed top-0 left-0 z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#FF4500] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-800 font-semibold text-sm">{message}</p>
          <p className="text-gray-400 text-xs">This may take a moment</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;