import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-800 bg-opacity-90 fixed top-0 left-0 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="text-white mt-4 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
