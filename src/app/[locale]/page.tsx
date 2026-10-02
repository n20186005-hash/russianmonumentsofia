import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BasicInfo from '@/components/BasicInfo';
import MapEmbed from '@/components/MapEmbed';
import TransportSection from '@/components/TransportSection';
import Intro from '@/components/Intro';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import InfoSection from '@/components/InfoSection';
import DistrictSection from '@/components/DistrictSection';
import StoriesSection from '@/components/StoriesSection';
import RouteSection from '@/components/RouteSection';
import NearbyMonumentsSection from '@/components/NearbyMonumentsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BasicInfo />
        <MapEmbed />
        <TransportSection />
        <Intro />
        <HoursSection />
        <TicketsSection />
        <FacilitiesSection />
        <InfoSection />
        <DistrictSection />
        <StoriesSection />
        <RouteSection />
        <NearbyMonumentsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
