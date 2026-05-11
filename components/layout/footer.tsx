import { Container } from "@/components/ui/container";
import Image from "next/image";
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
          {/* Brand mark */}
          <div>
            <Link href="/" aria-label="Cyrix — Home" className="inline-block">
              <Image
                src="/assets/images/logos/cyrix-final-logo-nobg.webp"
                alt="Cyrix"
                width={400}
                height={400}
                className="h-50 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-gray-400">
              Building modern digital experiences and sharing knowledge about
              tech, software & AI.
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
