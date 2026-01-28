import Image from "next/image";
import { BigBanner } from "@/components/BigBanner";
import { Blog } from "@/components/Blog";
import { CarouselHome } from "@/components/CarouselHome";
import { Clients } from "@/components/Clients";
import { Formulario } from "@/components/Form";
import { Reel } from "@/components/Reel";

export default function Home() {
  return (
    <>
        <BigBanner />
        <CarouselHome />
        <Clients />
        <Blog />
        <Formulario />
    </>
  );
}
