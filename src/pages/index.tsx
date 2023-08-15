"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
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
      e.preventDefault();
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

  useKeyDown((e) => {
    console.log(e.key);
    if (
      letterMap[e.key.toUpperCase() as keyof typeof letterMap] ===
        letterMap[currentLetter as keyof typeof letterMap] + 1 &&
      typoStack.length === 0
    ) {
      setCurrentLetter(e.key.toUpperCase());
    } else if (e.key === "Backspace") {
      setTypoStack(typoStack.slice(0, -1));
    } else {
      setTypoStack([...typoStack, e.key.toUpperCase()]);
    }
  }, Object.keys(letterMap));

  return (
    <>
      <Head>
        <title>Welcome to AZType</title>
        <meta name="description" content="Type A-Z as fast as you can!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-full ">
        <div className="flex h-[100%] w-[100%] flex-col items-center justify-center bg-gray-500">
          <h1>{letterMap[currentLetter as keyof typeof letterMap]}/26</h1>
          <h2>{...typoStack}</h2>
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        </div>
      </main>
    </>
  );
}
