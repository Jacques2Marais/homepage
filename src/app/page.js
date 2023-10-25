'use client';

import { inter, lora } from "@/lib/fonts"
import "./globals.css";

import { ChevronDownCircle, ChevronRight, Rocket } from "lucide-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { CustomCursor } from "@/lib/custom-cursor";

// context of sidebar's global open state
const SidebarOpenContext = createContext(null);

export default function Home() {
    // to toggle menu sidebar globally
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <SidebarOpenContext.Provider value={{menuOpen, setMenuOpen}}>
            <main className={`${inter.variable} ${lora.variable}`}>
                <Nav />
                <Landing />
                <span className="rocket-animation"><Rocket /></span>
            </main>
            <CustomCursor />
        </SidebarOpenContext.Provider>
    )
}

export function Nav() {
    const title = "Jacques Marais";

    // get/set/toggle sidebar's global open state
    const { menuOpen, setMenuOpen } = useContext(SidebarOpenContext);
    const toggleSidebar = () => setMenuOpen(!menuOpen);

    return (
        <>
            <nav className={`p-6 flex items-center gap-4 absolute z-40 transition-all ${menuOpen ? 'text-black pt-8': ''}`}>
                <button className={`transition-transform ${menuOpen ? 'rotate-180': 'rotate-0'} transition-all relative top-0 hover:-top-[2px] group`} onClick={toggleSidebar}><ChevronDownCircle className={`${menuOpen ? 'group-hover:fill-black group-hover:stroke-white': 'group-hover:fill-white group-hover:stroke-sky-950'} transition-all`} size="32" /></button>
                {/* <h5>{title.toUpperCase()}</h5> */}
            </nav>
            <nav className={`bg-white w-full z-30 absolute top-0 p-8 pl-[5.5rem] transition-transform ${menuOpen ? 'translate-y-0 text-black': '-translate-y-full text-white'}`}>
                <ul className="flex gap-8 text-lg relative top-[2px]">
                    <li className={`top-nav-item ${menuOpen ? 'left-0 opacity-100': '-left-4 opacity-0'}`}><a href="/projects">{/*<ChevronRight size={16} strokeWidth={4} />*/}Projects</a></li>
                    <li className={`top-nav-item ${menuOpen ? 'left-0 opacity-100': '-left-8 opacity-0'}`}><a href="/contact">{/*<ChevronRight size={16} strokeWidth={4} />*/}Contact</a></li>
                </ul>
            </nav>
        </>
    );
}

export function AnimatedHeader() {
    const text = "I build software and develop front-ends.";
    const words = text.split(" ");

    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const spans = words.map((word, index) => {
        return <span key={index} className={`transition-colors duration-300 hover:text-white ${highlightedIndex == index ? 'text-white': 'text-white/60'}`}>{word} </span>
    });

    useEffect(() => {
        let lastRandom = -1;

        setInterval(() => {
            let randomIndex = Math.floor(Math.random() * (words.length));

            while (randomIndex == lastRandom) {
                randomIndex = Math.floor(Math.random() * (words.length));
            }

            lastRandom = randomIndex;

            setHighlightedIndex(randomIndex);
        }, 1500);
    }, []);
    
    return (
        <h1 className='text-white/70 xl font-extrabold tracking-normal uppercase w-11/12'>{ spans }</h1>
    )
}

export function Landing() {
    return (
        <section className="pt-32">
            <AnimatedHeader />
        </section>
    )
}
