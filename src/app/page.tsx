import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";

// Below-the-fold sections are still server-rendered, but each ships in its own
// chunk and hydrates separately: the main thread is never blocked by one big task.
const Pillars = dynamic(() => import("@/components/sections/home/Pillars").then((m) => m.Pillars));
const SloganScroll = dynamic(() => import("@/components/sections/home/SloganScroll").then((m) => m.SloganScroll));
const PortfolioPreview = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.PortfolioPreview));
const Stats = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.Stats));
const QuoteBand = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.QuoteBand));
const JourneyPreview = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.JourneyPreview));
const ValuesMarquee = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.ValuesMarquee));
const FounderTeaser = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.FounderTeaser));
const FaqPreview = dynamic(() => import("@/components/sections/home/HomeSections").then((m) => m.FaqPreview));

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
