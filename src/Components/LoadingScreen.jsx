import React from "react"
import { logo } from '../assets';

function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full bg-white w-20 h-20 border border-gray-200 flex items-center mt-[-4px] justify-center">
        <img className="mx-auto" src={logo} alt="Your Website Logo" />
      </div>
    </div>
  );
}

export default LoadingScreen;