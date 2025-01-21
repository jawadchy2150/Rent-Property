import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomePageProperties from '@/components/HomePageProperties';
import connectDB from '@/config/database';

const fetchProperties = async () => {
  const response = await fetch(`${process.env.API_URL}/api/properties`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }

  const data = await response.json();
  return data.properties; // Assuming the API returns an object with a `properties` field
};

const Page = async () => {
  await connectDB();

  const properties = await fetchProperties();

  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomePageProperties properties={properties} />
    </div>
  );
};

export default Page;
