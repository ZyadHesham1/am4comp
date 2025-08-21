import { ValueCard } from "./value.card";
import { Gem, ShieldCheck, Zap } from "lucide-react"; // Import some icons

export default function ValuesSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The principles that guide our business and partnerships.
          </p>
        </div>
        
        {/* A responsive grid that's 1 column on mobile and 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard
            Icon={ShieldCheck}
            title="Reliability"
            description="We provide only the most dependable products, ensuring your business runs smoothly without interruption."
          />
          <ValueCard
            Icon={Gem}
            title="Quality"
            description="Our commitment to quality means every product is genuine and sourced directly from official channels."
          />
          <ValueCard
            Icon={Zap}
            title="Efficiency"
            description="Streamlined processes and expert support to get you the right equipment, right when you need it."
          />
        </div>
      </div>
    </section>
  );
}