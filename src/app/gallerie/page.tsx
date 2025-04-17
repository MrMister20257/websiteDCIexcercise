"use client"
import { useRef, useEffect} from 'react';

const dataObj = [
    { url: "/a1.jpg" },
    { url: "/a2.jpg" },
    { url: "/a3.jpg" },
    { url: "/a4.jpg" },  
    { url: "/a5.jpg" },
    { url: "/a6.jpg" }
]

export default function Galleriepage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        
        if (!scrollContainer) return;
        
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        };
        
        scrollContainer.addEventListener('wheel', handleWheel);
        
        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <main className="w-full h-full relative flex items-center justify-center">
            <div 
                ref={scrollContainerRef}
                className="h-full w-full flex items-center gap-5 overflow-x-scroll scroll whitespace-nowrap"
                style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none;  /* Chrome, Safari, Opera */
                    }
                `}</style>
                
                {dataObj.map((item, index) => (
                    <img 
                        key={index}
                        src={item.url} 
                        alt={`Bild ${index + 1}`}
                        className="test w-4/12 max-h-6/12 inline-block rounded-4xl cursor-pointer hover:scale-105 ease-in-out duration-300 border-2 border-pink-200"
                    />
                ))}
            </div>
        </main>
    )
}