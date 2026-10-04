import { Hero } from "@/components/sections/home/Hero";
import { Pillars } from "@/components/sections/home/Pillars";
import { SloganScroll } from "@/components/sections/home/SloganScroll";
import {
  PortfolioPreview,
  Stats,
  QuoteBand,
  ValuesMarquee,
  JourneyPreview,
  FounderTeaser,
  FaqPreview,
} from "@/components/sections/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <SloganScroll />
      <PortfolioPreview />
      <Stats />
      <QuoteBand />
      <JourneyPreview />
      <ValuesMarquee />
      <FounderTeaser />
      <FaqPreview />
    </>
  );
}
