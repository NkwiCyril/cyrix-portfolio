"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/50"
          : "bg-transparent",
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-logo text-2xl tracking-wide text-white uppercase"
          >
            Cyrix
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-accent-dark"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-4 w-72 border border-gray-800 bg-gray-950/95 backdrop-blur-xl shadow-2xl"
                      >
                        {/* "All Services" link */}
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="block border-b border-gray-800 px-5 py-3 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:bg-gray-900"
                        >
                          All Services
                        </Link>

                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-900"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-gray-800 text-gray-400 transition-colors group-hover:bg-accent group-hover:text-gray-950">
                                <Icon size={14} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                                  {service.title}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-accent-dark"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              href={"/contact"}
              className="text-sm font-bold uppercase tracking-wider transition-colors text-accent p-3 border-accent border-2 hover:bg-accent-dark hover:text-background"
            >
              Work With Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center text-white md:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-gray-800 bg-gray-950 md:hidden"
          >
            <Container className="py-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-accent-dark"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-200",
                            mobileServicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <Link
                              href="/services"
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 pl-4 text-xs font-bold uppercase tracking-wider text-accent"
                            >
                              All Services
                            </Link>
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 pl-4 text-sm text-gray-500 transition-colors hover:text-white"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-accent-dark"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
