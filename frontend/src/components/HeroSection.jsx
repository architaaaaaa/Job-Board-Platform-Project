import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-10 text-[#3a0ca3]">
      <h1 className="text-5xl font-bold leading-tight">
        Discover & Apply to the Best <br />
        <span className="text-[#F83002]">Career Opportunities</span>
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
        Unlock a world of job opportunities. Explore roles in top industries and
        find the perfect fit for your skills and aspirations.
      </p>
      <div className="flex w-full max-w-2xl mx-auto mt-6 shadow-lg border border-[#3a0ca3] pl-4 rounded-full items-center gap-4 bg-white">
        <input
          type="text"
          placeholder="Find your dream jobs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow outline-none bg-transparent py-3 text-sm placeholder:text-gray-500"
        />
        <Button
          onClick={searchJobHandler}
          className="rounded-full bg-[#6A38C2] text-white px-6 hover:bg-[#5b30a6]"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
