'use client';

import { MousePointer2, MousePointerClick } from "lucide-react";
import "../app/globals.css";

import { useEffect, useState } from "react"

export function CustomCursor() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [visible, setVisible] = useState(false);
    const [click, setClick] = useState(false);

    const mouseEnter = () => {
        setVisible(true);
    }

    const mouseLeave = () => {
        setVisible(false);
    }

    const mouseDown = () => {
        setClick(true);
    }

    const mouseUp = () => {
        setClick(false);
    }

    const mouseMove = (e) => {
        if (!visible) {
            setVisible(true);
        }

        setX(e.clientX - 16);
        setY(e.clientY - 16);
    }

    useEffect(() => {
        document.addEventListener("mouseenter", mouseEnter);
        document.addEventListener("mouseleave", mouseLeave);
        document.documentElement.addEventListener("mouseenter", mouseEnter);
        document.documentElement.addEventListener("mouseleave", mouseLeave);
        document.addEventListener("mousedown", mouseDown);
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("mousemove", mouseMove);
        

        return () => {
            document.removeEventListener("mouseenter", mouseEnter);
            document.removeEventListener("mouseleave", mouseLeave);
            document.removeEventListener("mousedown", mouseDown);
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        }
    }, []);

    let styles = {
        top: y + 'px',
        left: x + 'px',
        display: visible ? 'block' : 'none'
    };

    return (
        <>
            <span
                id="custom-cursor"
                style={styles}
                className={`${click && 'clicked'}`}
            >
                <span id="cursor-icon-holder">
                    <span className={`pointer-icon pointer-def ${click ? 'custom-pointer-hide': 'custom-pointer-show'}`}><MousePointer2 fill="black" /></span>
                    <span className={`pointer-icon pointer-click ${click ? 'custom-pointer-show': 'custom-pointer-hide'}`}><MousePointerClick size="30" fill="black" strokeWidth={"1.5px"} /></span>
                </span>
            </span>
        </>
    )
}