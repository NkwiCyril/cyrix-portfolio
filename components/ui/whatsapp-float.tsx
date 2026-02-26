"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);

  // Replace with your actual WhatsApp number (format: country code + number, no + or spaces)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // Example: Cameroon number
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in one of your services."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-accent/20"
      aria-label="Contact us on WhatsApp"
    >
      <motion.div
        animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <MessageCircle size={28} fill="white" />
      </motion.div>

      {/* Pulse animation */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
    </motion.a>
  );
}
