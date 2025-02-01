import React from 'react'
import CTAButton from "../HomePage/Button";
//import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgoundGradient, codeColor }) => {
  return (
    <div className={`flex flex-col lg:flex-row justify-between items-center ${position} mx-4 lg:mx-20 gap-10 lg:gap-[200px] mt-10 lg:mt-20`}>
      {/* Section 1 */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        <div className="text-[24px] sm:text-[28px] lg:text-[36px] leading-8 sm:leading-9 lg:leading-10 font-inter">
          {heading}
        </div>
        <div className="text-richblack-300 text-[14px] sm:text-[16px] leading-5 sm:leading-6">
          {subheading}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-5 sm:mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div>
              {ctabtn2.btnText}
            </div>
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative flex flex-row h-fit w-full lg:w-[500px] py-4 bg-gradient-to-l from-richblue-800 to-transparent border-l-[1px] border-t-[1px] rounded border-richblue-800">
        {/* Gradient */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          {backgoundGradient}
        </div>

        {/* Line Numbers */}
        <div className="lg:flex flex-col w-[10%] text-richblack-400 text-[12px] sm:text-[14px] leading-5 font-inter font-bold">
          {[...Array(11).keys()].map((i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Block */}
        <div className={`w-[90%] flex flex-col gap-2 text-[12px] sm:text-[14px] leading-5 font-mono ${codeColor} pr-2`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>

    // <div className={`flex justify-between items-center ${position} m-20 gap-[200px] mt-20`}>
    //   {/*section*/}
    //   <div className='lg:w-[50%] flex flex-col gap-8'>
    //     <div className='text-[36px] leading-10 font-inter text-wrap'>
    //       {heading}
    //     </div>
    //     <div className='text-richblack-300 text-[16px] leading-6'>
    //       {subheading}
    //     </div>
    //     <div className='flex gap-7 mt-7'>
    //       <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
    //         <div className='flex gap-2 items-center'>
    //           {ctabtn1.btnText }
    //           <FaArrowRight />
    //         </div>
    //       </CTAButton>

    //       <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
    //         <div>
    //            {ctabtn2.btnText}
    //         </div>

    //       </CTAButton>
    //     </div>



    //   </div>

    //   {/*Section 2*/}
    //   <div className='relative h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px] bg-gradient-to-l from-richblue-800 to-transparent border-l-[1px] border-t-[1px] rounded border-richblue-800'>
    //     {/*Gradient */}
    //     <div className='absolute z-20 left-[50%] translate-x-[-50%] top-[50%]'>
    //       {backgoundGradient}
    //     </div>

    //     <div className='text-center flex flex-col w-[10%] text-richblack-400 text-[14px] leading-5 font-inter font-bold'>
    //       <p>1</p>
    //       <p>2</p>
    //       <p>3</p>
    //       <p>4</p>
    //       <p>5</p>
    //       <p>6</p>
    //       <p>7</p>
    //       <p>8</p>
    //       <p>9</p>
    //       <p>10</p>
    //       <p>11</p>
    //     </div>

    //     <div className={`w-[90%] flex flex-col gap-2 text-[14px] leading-5 font-mono ${codeColor} pr-2`}>
    //       <TypeAnimation
    //         sequence={[codeblock, 1000, ""]}
    //         cursor={true}
    //         repeat={Infinity}
    //         style={{
    //           whiteSpace: "pre-line",
    //           display: "block",
    //         }}
    //         omitDeletionAnimation={true}
    //       />
    //     </div>
    //   </div>
    // </div>
  )
}


export default CodeBlock;