'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Navbar from "@/app/frontend/src/components/navigation/Navbar";

export default function Home() {
    // @ts-ignore
    const [emblaRef] = useEmblaCarousel({loop: true, autoplay: true, speed: 10})

    return (
        <div className="bg-gray-50 w-full min-h-screen">
            {/*navbar*/}
            <Navbar />
            {/*emblaref container*/}

        </div>
    );
}
