"use client"

import ScheduleInput from "@/components/ScheduleInput";
import MailTempalte from "@/components/MailTempalte";
import ScheduledList from "@/components/ScheduledList";

export default function Home() {
  return (
    <div className="h-full w-full bg-white py-10 px-40 flex flex-col text-black gap-4"> 
      <div className="w-full h-full flex justify-between items-center gap-4">
      <ScheduleInput />
      <MailTempalte />
      </div >
      <div className="w-full h-full flex items-center justify-center">
      <ScheduledList />
      </div>
      

    </div>
  );
}