"use client";
import { useState, useEffect, useRef } from "react";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressBarRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const width = rect.width;
    const newPercentage = (x / width) * 100;

    if (newPercentage >= 0 && newPercentage <= 100) {
      setPercentage(newPercentage);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    console.log("mouseup");
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const rect = progressBarRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const width = rect.width;
      const newPercentage = (x / width) * 100;

      if (newPercentage >= 0 && newPercentage <= 100) {
        setPercentage(newPercentage);
      }
    }
  };

  useEffect(() => {
    const removeListeners = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [isDragging]);

  return (
    <div className="flex w-full h-4 items-center justify-between">
      <div
        className="bg-[#EBEBEB] h-full w-[85%] rounded-lg cursor-pointer overflow-hidden"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={progressBarRef}
      >
        <div
          className="h-full bg-blue-500 rounded-lg"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="hello">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
