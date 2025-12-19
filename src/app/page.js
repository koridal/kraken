import KrakenHero from "@/components/KrakenHero";
import HomePreviewGrid from "@/components/HomePreviewGrid";

export default function Home() {
  return (
    <div className="space-y-12 pb-10 md:space-y-14 md:pb-0">
      <KrakenHero />
      <HomePreviewGrid />
    </div>
  );
}

