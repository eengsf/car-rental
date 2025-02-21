import React from 'react';

function loading() {
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center items-center h-2/3">
        <div className="w-16 h-16 border-8 border-custom-semiThin border-t-custom-medium rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default loading;
