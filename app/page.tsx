import CarList from '@/components/CarList';
import ChooseUs from '@/components/ChooseUs';
import HomePage from '@/components/HomePage';
import Step from '@/components/Step';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <HomePage />
      <Step />
      <ChooseUs />
      <CarList />
      <Testimonials />
    </>
  );
}