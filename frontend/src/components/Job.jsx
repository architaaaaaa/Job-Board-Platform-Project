import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-6 rounded-xl shadow-lg bg-[#F9F5FF] border border-[#F0E5FF] hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-[#6A38C2] hover:text-white transition-all duration-200"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Button className="p-3" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-lg text-[#6A38C2]">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-[#5B30A6]">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex items-center gap-3 mt-4">
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

      <div className="flex items-center gap-6 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="hover:bg-[#6A38C2] hover:text-white transition-all duration-200"
        >
          Details
        </Button>
        <Button className="bg-[#6A38C2] text-white hover:bg-[#5B30A6]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
