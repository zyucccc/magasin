import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";

export default function Carousel() {
    // @ts-ignore
    const [emblaRef] = useEmblaCarousel({loop: true, autoplay: true, speed: 10})

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                <div className="flex-[0_0_100%] min-w-0 relative h-[400px]">
                    <Image src="/home_page/slide1.jpg" alt="Slide 1" layout="fill" objectFit="cover"/>
                </div>
            </div>
        </div>
    )
}