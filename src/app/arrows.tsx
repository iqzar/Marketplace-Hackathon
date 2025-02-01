import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

// The arrows component now accepts two props: one to go left and one to go right
interface ArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function Arrows({ onPrev, onNext }: ArrowsProps) {
  return (
    <main className='flex space-x-3'>
      <div 
        className='border h-[28px] w-[28px] bg-sec rounded-full cursor-pointer' 
        onClick={onPrev} // Trigger the onPrev function when clicked
      >
        <ArrowLeft className='h-5 w-5 pt-1 pl-1' />
      </div>
      
      <div 
        className='border h-[28px] w-[28px] bg-sec rounded-full cursor-pointer' 
        onClick={onNext} // Trigger the onNext function when clicked
      >
        <ArrowRight className='h-5 w-5 pt-1 pl-1' />
      </div>
    </main>
  );
}
