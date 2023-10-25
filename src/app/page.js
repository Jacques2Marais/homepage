'use client';

import { inter, lora } from "@/lib/fonts"
import "./globals.css";

import { ChevronDownCircle, ChevronRight, Rocket } from "lucide-react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { CustomCursor } from "@/lib/custom-cursor";

// context of sidebar's global open state
const SidebarOpenContext = createContext(null);

export default function Home() {
    return (
        <main className={`${inter.variable} ${lora.variable} grid grid-cols-2 grid-rows-2 p-24`}>
            <div><AnimatedHeader /></div>
            <div></div>
            <div></div>
            <div></div>
        </main>
    )
}

export function AnimatedHeader() {
    const text = "This is Jacques Marais.";
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
        <h1 className='text-white/70 text-8xl font-extrabold tracking-normal uppercase'>{ spans }</h1>
    )
}