import React from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomePageProperties from '@/components/HomePageProperties'
import connectDB from '@/config/database'

const page = async () => {
  await connectDB();
  return (
    <div>
      <Hero/>
      <InfoBoxes/>
      <HomePageProperties/>
    </div>
  )
}

export default page
  