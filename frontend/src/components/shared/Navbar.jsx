import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#e0c3fc] via-[#8ec5fc] to-[#c2e9fb] shadow-md w-full">
      <div className="flex items-center justify-between w-full h-16 px-2">
        <h1 className="text-3xl font-extrabold text-purple-800 tracking-wide">
          Job<span className="text-blue-700">Vista</span>
        </h1>

        <div className="flex items-center gap-10">
          <ul className="flex font-semibold text-purple-900 items-center gap-6 text-base">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-purple-600 transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-purple-600 transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-purple-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-purple-600 transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-purple-600 transition"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-700 hover:bg-purple-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-purple-300 shadow-sm">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="user avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 bg-white shadow-lg border-purple-200"
                sideOffset={10}
              >
                <div className="flex gap-3 items-center mb-3">
                  <Avatar className="border-2 border-purple-300 shadow-sm">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="user avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-purple-800">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-gray-700">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2 hover:text-purple-600">
                      <User2 size={18} />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 text-sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 hover:text-purple-600">
                    <LogOut size={18} />
                    <Button
                      variant="link"
                      onClick={logoutHandler}
                      className="p-0 text-sm"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
