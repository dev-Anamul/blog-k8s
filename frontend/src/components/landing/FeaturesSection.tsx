import { features } from "@/constants/landing";
import { FeatureCard } from "./FeatureCard";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Our Platform?"
          description="Everything you need to read, write, and share great content."
          className="mb-8"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
