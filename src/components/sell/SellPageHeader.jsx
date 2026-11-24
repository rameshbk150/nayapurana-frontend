
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function SellPageHeader({
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonHref = "/sell/create",
}) {
  return (
    <section className="sell-hero">
      <div className="sell-hero-content">
        <span className="sell-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>

        {buttonLabel && (
          <Link href={buttonHref} className="sell-primary-button">
            <Plus size={18} />
            {buttonLabel}
            <ArrowRight size={17} />
          </Link>
        )}
      </div>

      <div className="sell-hero-art" aria-hidden="true">
        <div className="sell-art-circle sell-art-circle-one" />
        <div className="sell-art-circle sell-art-circle-two" />

        <div className="sell-art-card">
          <span className="sell-art-bag">NP</span>
          <span className="sell-art-caption">Give it a new life</span>
          <span className="sell-art-price">₹ Great deals</span>
        </div>
      </div>
    </section>
  );
}
