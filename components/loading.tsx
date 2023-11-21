import React from "react";
import { ImSpinner } from "react-icons/im";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900/20">
      <div className="flex flex-col items-center justify-center gap-y-5">
        <ImSpinner size={60} className="animate-spin" />
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
