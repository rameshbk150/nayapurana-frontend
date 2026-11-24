
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Camera,
  Play,
  Briefcase,
  Heart,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  Globe,
} from "lucide-react";
import footerData from "@/data/footerData";
import "@/style/footer.css";

const socialIconMap = {
  Instagram: Camera,
  Facebook: Globe,
  Youtube: Play,
  Linkedin: Briefcase,
};

function FooterLinks({ title, links }) {
  return (
    <div className="footer-column">
      <h3 className="footer-column-title">{title}</h3>

      <ul className="footer-link-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  async function handleNewsletterSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter your email address.");
      return;
    }

    setNewsletterStatus("loading");
    setNewsletterMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to subscribe right now."
        );
      }

      setNewsletterStatus("success");
      setNewsletterMessage(
        result.message || "Thank you for subscribing!"
      );
      setEmail("");
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage(
        error.message ||
          "Subscription failed. Please try again later."
      );
    }
  }

  const { brand, contact, newsletter } = footerData;

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand and description */}
          <div className="footer-brand-column">
            <Link href={brand.homeUrl} className="footer-brand">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={48}
                  height={48}
                  className="footer-logo-image"
                />
              ) : (
                <span className="footer-logo-placeholder">
                  <ShoppingBag size={25} />
                </span>
              )}

              <span className="footer-brand-copy">
                <strong>{brand.name}</strong>
                <small>{brand.tagline}</small>
              </span>
            </Link>

            <p className="footer-brand-description">
              {brand.description}
            </p>

            <div className="footer-socials">
              <span className="footer-social-heading">
                FOLLOW OUR JOURNEY
              </span>

              <div className="footer-social-list">
                {footerData.socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon];

                  if (!Icon) return null;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      aria-label={`Visit NayaPurana on ${social.name}`}
                      title={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <FooterLinks
            title="Quick Links"
            links={footerData.quickLinks}
          />

          {/* Categories */}
          <FooterLinks
            title="Popular Categories"
            links={footerData.popularCategories}
          />

          {/* Contact details */}
          <div className="footer-column footer-contact-column">
            <h3 className="footer-column-title">Get in Touch</h3>

            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">
                  <MapPin size={18} />
                </span>

                <div>
                  <strong>Our Location</strong>
                  {contact.mapUrl ? (
                    <a
                      href={contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.address}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span>{contact.address}</span>
                  )}
                </div>
              </li>

              <li>
                <span className="footer-contact-icon">
                  <Mail size={18} />
                </span>

                <div>
                  <strong>Email Us</strong>
                  <a href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </div>
              </li>

              <li>
                <span className="footer-contact-icon">
                  <Phone size={18} />
                </span>

                <div>
                  <strong>Call Us</strong>
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                    {contact.phone}
                  </a>
                </div>
              </li>

              <li>
                <span className="footer-contact-icon">
                  <Clock3 size={18} />
                </span>

                <div>
                  <strong>Support Hours</strong>
                  <span>{contact.businessHours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-container">
          <div className="footer-newsletter">
            <div className="footer-newsletter-copy">
              <span className="footer-newsletter-eyebrow">
                THE NAYAPURANA UPDATE
              </span>

              <h3>{newsletter.title}</h3>
              <p>{newsletter.description}</p>
            </div>

            <form
              className="footer-newsletter-form"
              onSubmit={handleNewsletterSubmit}
            >
              <div className="footer-newsletter-input-wrap">
                <Mail size={18} />

                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-label="Email address for newsletter"
                  required
                  disabled={newsletterStatus === "loading"}
                />

                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                >
                  {newsletterStatus === "loading"
                    ? "Sending..."
                    : newsletter.buttonLabel}
                  <Send size={15} />
                </button>
              </div>

              {newsletterMessage && (
                <p
                  className={`footer-newsletter-message ${newsletterStatus}`}
                  role="status"
                >
                  {newsletterStatus === "success" ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <AlertCircle size={15} />
                  )}
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p>{footerData.copyright}</p>

          <div className="footer-bottom-links">
            {footerData.supportLinks
              .filter((link) =>
                ["Privacy Policy", "Terms & Conditions"].includes(
                  link.label
                )
              )
              .map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
          </div>

          <p className="footer-made-with">
            Made with <Heart size={14} fill="currentColor" /> for
            smarter shopping
          </p>
        </div>
      </div>
    </footer>
  );
}
