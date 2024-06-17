"use client"
import { FaSignOutAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners"
import ThemeSwich from "./ThemeSwich"
import { FaUserPlus } from "react-icons/fa6";
import { Input } from "../ui/input";
import { HiMenuAlt3 } from "react-icons/hi";

import Conversation from "./Conversation";
import { conversations } from "../data/DummyData";
import { SignedOut, SignInButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";


const LeftPanel = () => {
  const { user } = useUser();
  // console.log(user?.firstName)
  return (
    <div className="flex w-[30%] full flex-col ">
      {/* <ClipLoader color="red" /> */}
      <div className=" w-full flex h-16 border justify-between items-center p-2 bg-theme">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <p>{user?.firstName}</p>
        {/* <img src="/smile.jpg" className="w-12 h-12 rounded-full" /> */}
        <div className="flex items-center gap-3">
          <FaUserPlus size={20} className=" cursor-pointer" />
          <ThemeSwich />
        </div>
        {/* <FaSignOutAlt size={20} className=" cursor-pointer" /> */}
      </div>
      <div className="flex m-5">
        <Input placeholder="Search our start a new chat..." className="bg-theme" />
        <HiMenuAlt3 size={25} className=" cursor-pointer m-1" />
      </div>
      <div>
        {
          conversations.map(conversations => (
            <Conversation key={conversations._id} conversation={conversations} />
          ))
        }

      </div>
    </div>
  )
}

export default LeftPanel
