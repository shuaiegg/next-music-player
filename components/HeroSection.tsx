import Image from "next/image";

const HeroSection = () => {
    return (
        <div className="px-12 mt-8 flex items-center justify-center gap-6 md:mt-24 flex-wrap">
            <div>
            <span className="text-blue-400 text-xl ">Welcome to my site</span>
            <h1 className="text-blue-500 text-5xl md:text-7xl leading-tight">Hi, I'm Jack, a <br />UI UX {" "} <span className="text-blue-600">Designer</span></h1>
            <div className="flex gap-4 mt-8">
                <button className="bg-black text-white px-8 py-3 rounded-md font-medium cursor-pointer hover:bg-black/50">Contact now</button>
                <button>Learn more</button>
            </div>
            </div>

            <div className="mt-8 md:mt-0">
                <Image src="/hero-img.png" alt="hero" width={500} height={500} />
            </div>
        </div>
    )
}

export default HeroSection;