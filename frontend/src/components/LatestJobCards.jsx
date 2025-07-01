import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-2xl shadow-xl bg-white border border-[#F0E5FF] cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-[#6A38C2] hover:bg-[#F8F0FF]"
    >
      <div>
        <h1 className="font-semibold text-xl text-[#6A38C2]">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-[#5B30A6]">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-[#F8E8FF] text-[#6A38C2] font-semibold">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-[#D0E7FF] text-[#2D74D0] font-semibold">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#F8E0E0] text-[#F83002] font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
