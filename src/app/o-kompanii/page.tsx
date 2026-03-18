import OKompanii from "@/components/o-kompanii/O-kompanii";

import Park from "@/components/o-kompanii/Park";
import Reviews from "@/components/o-kompanii/Reviews";
import Contact from "@/components/o-kompanii/Contact";
import Team from "@/components/o-kompanii/Team";

export default function OKompaniiPage() {
  return (
    <main>
      <OKompanii />
      <Team />
      <Park />
      <Reviews />
      <Contact />
    </main>
  );
}
