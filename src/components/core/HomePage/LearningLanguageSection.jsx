import React from 'react'
import HighlightText from './HighlightText'
import knowYourprogress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";


export default function LearningLanguageSection() {
  return (

    <div className="mt-[130px] mb-32">
      <div className="flex flex-col items-center">
        {/* Heading Section */}
        <div className="text-2xl sm:text-4xl font-semibold text-center">
          Your Swiss knife for <HighlightText Text={"learning any language"} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-sm sm:text-base mt-3 font-inter font-medium w-[90%] sm:w-[70%]">
          Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule, and more.
        </div>

        {/* Images Section */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-10 items-center justify-center mt-10 lg:h-[450px]">
          <img
            src={knowYourprogress}
            alt="knowyourprogress"
            className="object-contain w-[70%] sm:w-[50%] lg:w-auto -mr-10 lg:-mr-32"
          />
          <img
            src={compare_with_others}
            alt="compareYourProgress"
            className="object-contain w-[70%] sm:w-[50%] lg:w-auto"
          />
          <img
            src={plan_your_lessons}
            alt="planyourlessons"
            className="object-contain w-[70%] sm:w-[50%] lg:w-auto -ml-10 lg:-ml-36"
          />
        </div>

        {/* CTA Button */}
        <div className="w-fit mt-10 mb-7">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>


    // <div className='mt-[130px] mb-32'>
    //   <div className='flex flex-col items-center'>
    //     <div className='text-4xl font-semibold text-center'>
    //       Your Swiss knife for 
    //       <HighlightText Text={"learning any language"} />
    //     </div>
    //     <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-inter font-medium w-[70%]'>
    //     Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
    //     </div>

    //     <div className='flex flex-row gap-2 items-center justif-center mt-10 lg:h-[450px]'>
    //       <img src={knowYourprogress}
    //       alt ="knowyourprogress" className='object-contain -mr-32' 
    //       />
    //       <img  src={compare_with_others}
    //         alt='compareYourProgress'
    //         className='object-contain' 
    //       />
    //       <img src={plan_your_lessons} alt='planyourlessons' className='object-contain -ml-36'
    //       />
    //     </div>

    //     <div className=' w-fit  mt-10 mb-7'>
    //       <CTAButton active={true} linkto={"/signup"}>
    //       <div>
    //         Learn More
    //       </div>
    //     </CTAButton>
    //     </div>
    //   </div>
    // </div>
  )
}
