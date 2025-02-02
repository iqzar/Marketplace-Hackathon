// components/LoadingSpinner.tsx
// Import a loading spinner

const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-transparent border-side border-solid rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;