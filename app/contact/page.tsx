"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Have a project in mind? Let's discuss how I can help bring your ideas to life."
      />

      <section className="bg-white py-24 lg:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold text-gray-950">
                Send a Message
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Fill out the form below and I'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold uppercase tracking-wider text-gray-950"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full border-b-2 border-gray-300 bg-transparent py-3 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold uppercase tracking-wider text-gray-950"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full border-b-2 border-gray-300 bg-transparent py-3 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-bold uppercase tracking-wider text-gray-950"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border-b-2 border-gray-300 bg-transparent py-3 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold uppercase tracking-wider text-gray-950"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-2 w-full resize-none border-2 border-gray-300 bg-gray-50 p-4 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`border-l-4 p-4 ${
                      submitStatus.type === "success"
                        ? "border-accent bg-accent/10 text-gray-950"
                        : "border-red-500 bg-red-50 text-red-900"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <Button type="submit" size="lg" disabled={isSubmitting} >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={16} />
                  </Button>

                  <a
                    href="https://forms.google.com/your-form-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="button" variant="outline" size="lg" className="border-accent text-accent">
                      Business Inquiry Form
                      <ExternalLink size={16} />
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-gray-500">
                  * Required fields. For detailed business inquiries, please use
                  the Business Inquiry Form.
                </p>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950">
                Contact Information
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-gray-950">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Email
                    </p>
                    <a
                      href="mailto:hello@cyrix.dev"
                      className="mt-1 block text-sm font-medium text-gray-950 transition-colors hover:text-accent"
                    >
                      hello@cyrix.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-gray-950">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Phone
                    </p>
                    <a
                      href="tel:+237123456789"
                      className="mt-1 block text-sm font-medium text-gray-950 transition-colors hover:text-accent"
                    >
                      +237 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-gray-950">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-950">
                      Buea, Cameroon
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950">
                  Office Hours
                </h4>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-950">
                      Monday - Friday:
                    </span>{" "}
                    9:00 AM - 6:00 PM
                  </p>
                  <p>
                    <span className="font-medium text-gray-950">
                      Saturday:
                    </span>{" "}
                    10:00 AM - 2:00 PM
                  </p>
                  <p>
                    <span className="font-medium text-gray-950">Sunday:</span>{" "}
                    Closed
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950">
                  Response Time
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  I typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please use WhatsApp.
                </p>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>
    </>
  );
}
