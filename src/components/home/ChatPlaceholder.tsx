import React from 'react'
import { Button } from '../ui/button';
import Image from "next/image";
import { Lock } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';

const ChatPlaceHolder = () => {
  return (
    <div className='w-3/4 bg-theme flex flex-col items-center justify-center m-1'>
      <div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
        {/* <Image src={"/smile.jpg"} alt='Hero' width={320} height={188} /> */}
        <FaWhatsapp size={100} className=' text-green-600' />
        <p className='text-3xl font-extralight mt-5 mb-2'>Download WhatsApp for Windows</p>
        <p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
          Make calls, share your screen and get a faster experience when you download the Windows app.
        </p>

        <Button className='rounded-full my-5 hover:bg-theme hover:text-black'>
          Get from Microsoft Store
        </Button>
      </div>
      <p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1'>
        <Lock size={10} /> Your personal messages are end-to-end encrypted
      </p>
    </div>
  );

}

export default ChatPlaceHolder
