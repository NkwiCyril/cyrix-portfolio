"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentWord, setCurrentWord] = useState("Business");
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(150);

  const words = ["Business", "Career", "Company"];

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta]);

  const tick = () => {
    const fullText = words[words.indexOf(currentWord)];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(75);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setCurrentWord(words[(words.indexOf(currentWord) + 1) % words.length]);
      setDelta(150);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-cover grayscale"
        style={{
          backgroundImage:
            "url('/assets/images/business-people-working-together.jpg')",
        }}
      />
      {/* Dark overlays for blend + readability */}
      <div className="pointer-events-none absolute inset-0 bg-gray-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-gray-950/70 via-gray-950/40 to-gray-950" />

      <Container>
        <div className="flex flex-col min-h-screen items-center justify-center pt-40">
          {/* Mentorship Coming Soon */}
          <span className="flex items-center gap-2 border border-accent rounded-4xl px-2 z-10">
            <span className="text-accent-dark text-lg">✦</span>
            <h4 className="text-center text-[12px] font-medium"><span className="font-logo">CYRIX </span> Mentorship Program - <span className="text-accent font-light">Coming Soon</span></h4>
          </span>
          {/* Centered content */}  
          <div className="relative z-10 max-w-4xl pt-10 pb-20 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-sans text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              Unlock
              Digital Success
              For Your{" "}
              <span className="text-accent">
                {text}
                <span className="animate-pulse">|</span>
              </span>
              Today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto my-12 max-w-2xl text-lg leading-relaxed text-gray-200"
            >
              Taking you Online Presence to the Next Level
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <Button size="lg">
                Get Started
                <ArrowRight size={16} />
              </Button>
            </motion.div>

            {/* Contact info row */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 flex flex-wrap justify-center gap-12 text-sm text-gray-500"
            >
              <div>
                <p className="text-gray-400">Based in</p>
                <p className="mt-1 text-white">Buea, Cameroon</p>
              </div>
              <div>
                <p className="text-gray-400">Get in touch</p>
                <p className="mt-1 text-white">hello@cyrix.dev</p>
              </div>
            </motion.div> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
