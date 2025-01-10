import React from 'react';
// import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertySearchForm from '@/components/PropertySearchForm';
import Link from 'next/link';

const propertiesPage = async () => {
  const properties = await fetchProperties();

  // sort properties by date
  properties.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (<>
    <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm/>
        </div>
    </section>
    
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {/* <h1 className="text-2xl mb-4">Search Results</h1> */}
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key = {property._id} property = {property} />
          ))}
        </div>
        )}
        
      </div>
    </section>  
  </>)
}

export default propertiesPage
