import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "Portfolios", href: "/portfolio" },
  { label: "Services", href: "#" },
  { label: "Testimonials", href: "#" },
  { label: "Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 pt-20 pb-10">
      <Container>
        <div className="grid gap-16 md:grid-cols-3">
          {/* Email signup */}
          <div>
            <p className="text-sm font-bold leading-relaxed text-white">
              Get valuable strategy, culture and brand
              insights straight to your inbox
            </p>
            <div className="mt-6 flex items-center border-b border-gray-700">
              <input
                type="email"
                placeholder="Your email here"
                className="w-full bg-transparent py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none"
              />
              <button className="shrink-0 p-2 text-gray-400 transition-colors hover:text-accent">
                <ArrowUpRight size={18} />
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-gray-600">
              By signing up to receive emails from Cyrix, you agree to our
              Privacy Policy. We treat your info responsibly.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-white">Links</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 underline decoration-gray-700 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white">Contact</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>Buea, Cameroon</p>
              <p>hello@cyrix.dev</p>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-20 border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Cyrix. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
