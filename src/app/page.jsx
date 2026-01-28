import Image from "next/image";
import { BigBanner } from "@/components/BigBanner";
import { Blog } from "@/components/Blog";
import { CarouselHome } from "@/components/CarouselHome";
import { Clients } from "@/components/Clients";
import { Formulario } from "@/components/Form";
import { Reel } from "@/components/Reel";
import { getPortfolioItems } from "@/lib/sanity";
import { Player } from "@/components/Player";
import { Services } from "@/components/Services";

export default async function Home() {
  const portfolioItems = await getPortfolioItems();

  return (
    <>
        <BigBanner />
        <CarouselHome portfolioItems={portfolioItems} />
        <Reel />
        <Player />
        <Clients />
        <Services />
        <Blog />
        <Formulario />
    </>
  );
}
