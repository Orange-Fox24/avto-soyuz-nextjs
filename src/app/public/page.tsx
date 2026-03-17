import ContactForm from "@/components/home/ContactForm";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WhyUs from "@/components/home/WhyUs";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <WhyUs />
      <ContactForm />
    </div>
  );
}
