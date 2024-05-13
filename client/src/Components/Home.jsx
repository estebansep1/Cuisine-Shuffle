import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full bg-orange-400 gap-12">
        <div className="flex flex-row justify-center items-center w-full gap-12">
          <img className="w-48 h-48" src="/assets/chefs.svg" alt="logo" />
          <h1 className="text-8xl font-black text-white uppercase">Cuisine Shuffle</h1>
        </div>
        <button
          className="px-24 py-4 bg-white rounded-full shadow-sm transition-shadow duration-300 hover:shadow-xl"
          onClick={() => navigate("/choose")}
        >
          <h1 className="text-2xl font-bold text-orange-400 uppercase">
            Get Started
          </h1>
        </button>
      </div>
    </>
  );
}
