import type { Metadata } from "next";
import { slides } from "@/components/slides";

export const metadata: Metadata = {
  title: "Smart Kitchen Gas & Fire Alert System (print)",
};

/** All slides stacked, one 1920x1080 page each. Print > Save as PDF. */
export default function PrintPage() {
  return (
    <div className="print-root">
      {slides.map((S, i) => (
        <S key={i} eager />
      ))}
    </div>
  );
}
