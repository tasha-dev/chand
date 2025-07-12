// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { cn } from '@/lib/utils';
import { ClockProps } from '@/type/component';
import { useEffect, useState, ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function Clock({ className }: ClockProps): ReactNode {
  // Defining state of component
  const [time, setTime] = useState(new Date());

  // Using useEffect to update time state on 1 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Defining variables
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const day = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();

  const secondsText = seconds < 10 ? `0${seconds}` : seconds;
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  const hourText = hours < 10 ? `0${hours}` : hours;
  const dayText = day < 10 ? `0${day}` : day;
  const monthText = month < 10 ? `0${month}` : month;
  const yearText = year < 10 ? `0${year}` : year;

  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  // Returning JSX
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            'relative w-[30px] h-[30px] rounded-full border dark:border-slate-200 border-slate-800 bg-transparent cursor-pointer',
            className,
          )}
        >
          <div
            className='absolute origin-bottom w-0.25 h-[8px] dark:bg-slate-200 bg-slate-800 left-1/2 bottom-1/2'
            style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
          />
          <div
            className='absolute origin-bottom w-0.25 h-[10px] dark:bg-slate-200 bg-slate-800 left-1/2 bottom-1/2'
            style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
          />
          <div
            className='absolute origin-bottom w-0.25 h-[12px] dark:bg-slate-200/50 bg-slate-800/50 left-1/2 bottom-1/2'
            style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}
          />
          <div className='absolute w-[5px] h-[5px] bg-gray-800 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{`${hourText}:${minutesText}:${secondsText} - ${monthText}/${dayText}/${yearText}`}</p>
      </TooltipContent>
    </Tooltip>
  );
}
