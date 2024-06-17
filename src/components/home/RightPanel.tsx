"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import ChatPlaceHolder from "./ChatPlaceholder";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import GroupMembersDialog from "./GroupMembersDialog";
// import { UserButton } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";


const RightPanel = () => {

  const selectedConversation = true;
  if (!selectedConversation) return <ChatPlaceHolder />;

  const conversationName = "John Doe";
  const isGroup = true
  return (
    <div className='w-3/4 flex flex-col bg-theme none '>
      <div className='w-full sticky top-0 z-50'>
        {/* Header */}
        <div className='flex justify-between bg-background p-3'>
          <div className='flex gap-3 items-center'>
            <Avatar>
              {/* <UserButton /> */}
              <AvatarImage src={"/smile.jpg"} className='object-cover' />
              <AvatarFallback>
                <div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full' />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p>{conversationName}</p>
              {isGroup && <GroupMembersDialog />}
            </div>
          </div>

          <div className='flex items-center gap-7 mr-5'>
            <a href='/video-call' target='_blank'>
              <Video size={23} />
            </a>
            <X size={16} className='cursor-pointer' />
          </div>
        </div>
      </div>
      {/* CHAT MESSAGES */}
      <MessageContainer />

      {/* INPUT */}
      <MessageInput />
    </div>
  );
};
export default RightPanel;