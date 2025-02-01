import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
  "Free",
  "New to coding",
  "Most Popular",
  "Skill Paths",
  "Career paths",

];
export default function ExploreMore() {

  const { currentTab, setCurrentTab } = useState(tabsName[0]);
  const { courses, setCourses } = useState(HomePageExplore[0].courses);
  const { currentCard, setCurrentCard } = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0], courses);
    setCurrentCard(result[0].courses[0].heading);

  }


  return (

    <div className="mt-10">
      {/* Heading Section */}
      <div className="text-2xl sm:text-4xl font-semibold text-center">
        Unlock the <HighlightText Text={"Power of Code"} />
      </div>
      <p className="text-center text-richblack-300 text-sm sm:text-[16px] mt-3">
        Learn to Build Anything You Can Imagine
      </p>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap justify-center rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1">
        {tabsName?.map((element, index) => (
          <div
            className={`text-sm sm:text-[16px] flex items-center gap-2 ${currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-4 sm:px-7 py-2`}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Space for Course Cards */}
      <div className="lg:h-[150px]"></div>

      {/* Course Cards Group */}
      <div className="relative flex flex-wrap gap-5 sm:gap-10 justify-center lg:justify-between w-full">
        {courses?.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>

    // <div className='mt-10'>
    //   <div className='text-4xl font-semibold text-center'>
    //     Unlock the 
    //     <HighlightText Text={"Power of Code"} />
    //   </div>
    //   <p className='text-center text-richblack-300 text-smtext-[16px] mt-3'>
    //     Learn to Build Anything You Can Imagine
    //   </p>

    //   <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1'>
    //     {
    //       tabsName?.map((element,index) => {
    //         return (
    //           <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200" } rounded-full tansition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} 
    //           key = {index} 
    //           onClick={() => setMyCards(element)}>
    //             {element}
    //           </div>
    //         )
    //       })
    //     }
    //   </div>

    //   <div className='lg:h-[150px]'>
    //   </div>

    //   {/* course card ka group */}

    //   <div className='absolute flex flex-row gap-10 justify-between w-full'>
    //     {
    //       courses?.map((element,index) =>{
    //         return (
    //           <CourseCard 
    //             key={index} 
    //             cardData={element} 
    //             currentCard ={currentCard}
    //             setCurrentCard = {setCurrentCard} 
    //           />
    //       )
    //       })
    //     }
    //   </div>

    // </div>
  )
}
