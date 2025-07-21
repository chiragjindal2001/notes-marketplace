"use client";

import React from 'react';

interface GoogleSignInButtonProps {
  onClick: () => Promise<void>;
  loading: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={loading}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.28426 53.749 C -8.52426 55.229 -9.21652 56.479 -10.0807 57.329 L -10.0927 57.329 L -4.71275 61.699 L -4.70275 61.689 C -2.43275 58.619 -1.264 54.839 -1.264 50.509 C -1.264 49.809 -1.304 49.129 -1.384 48.469 L -1.384 48.469 L -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.80426 62.159 -6.71275 60.479 L -10.0927 57.329 C -11.1427 58.289 -12.5843 58.849 -14.254 58.849 C -17.1843 58.849 -19.6643 56.749 -20.5943 54.019 L -20.754 54.019 L -24.2743 56.989 L -24.2243 57.079 C -22.1143 61.279 -18.754 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -20.5943 54.019 C -20.9443 52.919 -21.1443 51.739 -21.1443 50.509 C -21.1443 49.279 -20.9343 48.109 -20.5943 46.999 L -20.5943 46.999 L -23.9943 44.019 L -24.2243 43.939 C -25.2643 46.479 -25.8143 49.249 -25.8143 52.009 C -25.8143 54.769 -25.2643 57.529 -24.2243 60.079 L -20.5943 54.019 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 44.179 C -12.9843 44.169 -11.2543 44.739 -9.83426 45.789 L -6.40475 42.359 C -8.79475 40.199 -12.0643 38.949 -14.754 38.969 C -18.754 38.969 -22.1143 40.929 -24.2243 45.129 L -20.5943 46.999 C -19.6543 44.269 -17.1743 42.169 -14.754 42.169 L -14.754 44.179 Z"
              />
            </g>
          </svg>
          Continue with Google
        </>
      )}
    </button>
  );
};

export default GoogleSignInButton;
