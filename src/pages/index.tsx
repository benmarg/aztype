"use client";

import { time } from "console";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "~/components/footer";
import { api } from "~/utils/api";

function useKeyDown<T extends (e: KeyboardEvent) => void>(
  handler: T,
  keys: string[]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onKeyDown = (e: KeyboardEvent) => {
    const wasAnyKeyPressed =
      keys.includes(e.key.toUpperCase()) || e.key === "Backspace";
    if (wasAnyKeyPressed) {
      handler(e);
    }
  };

  useEffect(() => {
    document.addEventListener(`keydown`, onKeyDown);
    return () => {
      document.removeEventListener(`keydown`, onKeyDown);
    };
  }, [onKeyDown]);
}

export default function Home() {
  const letterMap = {
    "": 0,
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };

  const [currentLetter, setCurrentLetter] = useState("");
  const [typoStack, setTypoStack] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>();
  const [totalTime, setTotalTime] = useState<number>();
  const [mistakes, setMistakes] = useState<number>(0);
  const [timeBetweenLetters, setTimeBetweenLetters] = useState<number[]>([]);

  useKeyDown((e) => {
    console.log(currentLetter);
    if (
      letterMap[e.key.toUpperCase() as keyof typeof letterMap] ===
        letterMap[currentLetter as keyof typeof letterMap] + 1 &&
      typoStack.length === 0
    ) {
      setCurrentLetter(e.key.toUpperCase());
      if (e.key.toUpperCase() === "A") {
        setStartTime(Date.now());
        console.log(startTime);
      }
      if (e.key.toUpperCase() === "Z") {
        setTotalTime(Date.now() - startTime!);
      }
      if (currentLetter !== "A" && startTime) {
        setTimeBetweenLetters([
          ...timeBetweenLetters,
          Date.now() -
            (startTime + timeBetweenLetters.reduce((a, b) => a + b, 0)),
        ]);
      }
    } else if (e.key === "Backspace") {
      setTypoStack(typoStack.slice(0, -1));
    } else if (e.key.toUpperCase() === "R" && currentLetter === "Z") {
      setCurrentLetter("");
      setTypoStack([]);
      setStartTime(undefined);
      setTotalTime(undefined);
      setMistakes(0);
    } else {
      setTypoStack([...typoStack, e.key.toUpperCase()]);
      setMistakes(mistakes + 1);
    }
  }, Object.keys(letterMap));

  const cssForLetters = `
    div.letterContainer span:nth-child(-n+${
      letterMap[currentLetter as keyof typeof letterMap]
    }) {
      color: #e5f7ef
    }

    div.letterContainer span:nth-child(n+${
      letterMap[currentLetter as keyof typeof letterMap] + 1
    }):nth-child(-n+${
    letterMap[currentLetter as keyof typeof letterMap] + typoStack.length
  }) {
      color: #ff5f5f;
    }
    }
  `;

  return (
    <>
      <Head>
        <title>Welcome to AZType</title>
        <meta name="description" content="Type A-Z as fast as you can!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col">
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 overflow-auto bg-primary font-sans text-subprimary">
          <h1>{letterMap[currentLetter as keyof typeof letterMap]}/26</h1>
          <style>{cssForLetters}</style>
          <div
            className={`${
              currentLetter === "Z" ? "text-green-300" : "letterContainer"
            } flex gap-0.5 text-2xl`}
          >
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
            <span>F</span>
            <span>G</span>
            <span>H</span>
            <span>I</span>
            <span>J</span>
            <span>K</span>
            <span>L</span>
            <span>M</span>
            <span>N</span>
            <span>O</span>
            <span>P</span>
            <span>Q</span>
            <span>R</span>
            <span>S</span>
            <span>T</span>
            <span>U</span>
            <span>V</span>
            <span>W</span>
            <span>X</span>
            <span>Y</span>
            <span>Z</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:stroke-white"
            onClick={() => {
              setCurrentLetter("");
              setTypoStack([]);
              setStartTime(undefined);
              setTotalTime(undefined);
              setMistakes(0);
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
          </svg>
          {currentLetter === "Z" && timeBetweenLetters.length > 0 && (
            <h2>
              Average time between letters:{" "}
              {(
                timeBetweenLetters.reduce((a, b) => a + b) /
                timeBetweenLetters.length /
                1000
              ).toFixed(3)}
              &nbsp;seconds
            </h2>
          )}
          {totalTime && <h2>Time: {totalTime / 1000} seconds</h2>}
          {currentLetter === "Z" && <h2>Mistakes: {mistakes}</h2>}
        </div>
        <Footer />
      </main>
    </>
  );
}
