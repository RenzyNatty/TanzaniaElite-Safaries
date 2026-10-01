import { useState, useEffect, type FormEvent } from "react";
import {
  MapPin, Calendar, Users, ChevronRight, Star, Phone, Mail,
  Shield, Compass, Heart, Camera, Plane, Award, Menu, X,
  ArrowRight, Clock, Leaf, Globe, Check, Map, Sparkles,
  AlertCircle, LoaderCircle
} from "lucide-react";

// Simple inline social SVGs (lucide no longer ships brand icons)
const SocialIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d={d} />
  </svg>
);
const SOCIAL = {
  facebook: "M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H8v3h2.4V21h3.1z",
  instagram: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.5.4 1.1.4 2.3.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.5.2-1.1.4-2.3.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.5-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.5-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2M12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.1.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.6C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c1.3-.1 2.1-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.1-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.8.6 19 .3 18.2.1 16.9.1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8zm0 10.3A4.1 4.1 0 1 1 12 7.9a4.1 4.1 0 0 1 0 8.2zm6.4-10.5a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  twitter: "M18.9 4H22l-7.4 8.5L23 20h-6.8l-5.3-6.5L4.7 20H1.6l7.9-9.1L1 4h7l4.8 5.9L18.9 4zm-2.4 14.1h1.9L7.6 5.8H5.6l10.9 12.3z",
  youtube: "M23.5 6.2c-.3-1-1-1.8-2-2C19.7 3.7 12 3.7 12 3.7s-7.7 0-9.5.5c-1 .2-1.7 1-2 2C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2 1.8.5 9.5.5 9.5.5s7.7 0 9.5-.5c1-.2 1.7-1 2-2 .5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
};

// --- Image URLs (Pexels stock photography) ---
const IMG = {
  hero: "https://images.pexels.com/photos/18000394/pexels-photo-18000394.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&q=80",
  serengeti: "https://images.pexels.com/photos/33650634/pexels-photo-33650634.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  ngorongoro: "https://images.pexels.com/photos/28708345/pexels-photo-28708345.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  kilimanjaro: "https://images.pexels.com/photos/5109704/pexels-photo-5109704.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  zanzibar: "https://images.pexels.com/photos/30312987/pexels-photo-30312987.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  tarangire: "https://images.pexels.com/photos/28359728/pexels-photo-28359728.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  lakeManyara: "https://images.pexels.com/photos/15373903/pexels-photo-15373903.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  lions: "https://images.pexels.com/photos/8804574/pexels-photo-8804574.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  lionPortrait: "https://images.pexels.com/photos/18781005/pexels-photo-18781005.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  zanzibar2: "https://images.pexels.com/photos/8804770/pexels-photo-8804770.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
  kili2: "https://images.pexels.com/photos/15994021/pexels-photo-15994021.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
};

type BookingIntent = {
  destination: string;
  travelMonth: string;
  travellers: string;
  requestId: number;
};

const getDefaultTravelMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

// --- Navbar ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#destinations", label: "Destinations" },
    { href: "#tours", label: "Safari Tours" },
    { href: "#why", label: "Why Us" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="EliteSafaris" 
            className={`h-12 w-auto transition-all duration-300 ${scrolled ? "brightness-90" : "brightness-110 drop-shadow-lg"}`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-wide hover:text-safari-500 transition-colors ${
                scrolled ? "text-safari-900" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-safari-500 hover:bg-safari-600 text-white text-sm font-medium rounded-full transition-all shadow-lg shadow-safari-500/20 hover:shadow-xl hover:shadow-safari-500/30 flex items-center gap-1"
          >
            Book Safari <ArrowRight className="w-4 h-4" />
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-md ${scrolled ? "text-safari-900" : "text-white"}`}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-xl border-t border-safari-100">
          <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-safari-900 font-medium py-2 border-b border-safari-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-6 py-3 bg-safari-500 text-white text-center rounded-full font-medium"
            >
              Book Safari
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// --- Hero ---
function Hero({ onSearch }: { onSearch: (intent: BookingIntent) => void }) {
  const [destination, setDestination] = useState("Serengeti");
  const [travelMonth, setTravelMonth] = useState(getDefaultTravelMonth);
  const [travellers, setTravellers] = useState("2 Adults");

  const continueToBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({
      destination,
      travelMonth,
      travellers,
      requestId: Date.now(),
    });

    window.requestAnimationFrame(() => {
      document.getElementById("booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-slowZoom">
        <img src={IMG.hero} alt="Tanzania savanna" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-safari-950/70 via-safari-950/40 to-safari-950/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 text-center pt-24 pb-16 animate-fadeUp">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-safari-100 text-sm mb-8">
          <Sparkles className="w-4 h-4 text-safari-300" />
          <span>Award-Winning Tanzania Safari Operator</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] mb-6">
          Discover the Soul of
          <br />
          <span className="italic text-safari-300">Tanzania</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-safari-50/90 mb-10 leading-relaxed">
          Embark on once-in-a-lifetime journeys through Serengeti, Ngorongoro,
          Kilimanjaro and the spice island of Zanzibar — curated by local
          experts for the elite traveller.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="#tours"
            className="px-8 py-4 bg-safari-500 hover:bg-safari-600 text-white font-medium rounded-full transition-all shadow-xl shadow-safari-500/30 hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            Explore Tours <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#destinations"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 transition-all flex items-center gap-2"
          >
            <Plane className="w-5 h-5" /> View Destinations
          </a>
        </div>

        {/* Search / Booking Bar */}
        <form
          onSubmit={continueToBooking}
          aria-label="Find a safari and continue to booking"
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-3 md:p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-0 md:divide-x md:divide-safari-100">
            <div className="flex items-center gap-3 p-3">
              <MapPin className="w-5 h-5 text-safari-500 flex-shrink-0" />
              <div className="text-left">
                <label htmlFor="hero-destination" className="block text-[11px] uppercase tracking-wider text-safari-500 font-semibold">Destination</label>
                <select
                  id="hero-destination"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="text-safari-900 font-medium bg-transparent w-full outline-none cursor-pointer"
                >
                  <option>Serengeti</option>
                  <option>Ngorongoro</option>
                  <option>Kilimanjaro</option>
                  <option>Zanzibar</option>
                  <option>Tarangire</option>
                  <option>Lake Manyara</option>
                  <option>Northern Circuit</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <Calendar className="w-5 h-5 text-safari-500 flex-shrink-0" />
              <div className="min-w-0 text-left">
                <label htmlFor="hero-travel-month" className="block text-[11px] uppercase tracking-wider text-safari-500 font-semibold">Travel month</label>
                <input
                  id="hero-travel-month"
                  type="month"
                  required
                  min={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`}
                  value={travelMonth}
                  onChange={(event) => setTravelMonth(event.target.value)}
                  className="text-safari-900 font-medium bg-transparent outline-none w-full cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <Users className="w-5 h-5 text-safari-500 flex-shrink-0" />
              <div className="text-left">
                <label htmlFor="hero-travellers" className="block text-[11px] uppercase tracking-wider text-safari-500 font-semibold">Travellers</label>
                <select
                  id="hero-travellers"
                  value={travellers}
                  onChange={(event) => setTravellers(event.target.value)}
                  className="text-safari-900 font-medium bg-transparent w-full outline-none cursor-pointer"
                >
                  <option>2 Adults</option>
                  <option>Solo</option>
                  <option>Family (3-5)</option>
                  <option>Group (6+)</option>
                </select>
              </div>
            </div>
            <button type="submit" className="bg-safari-500 hover:bg-safari-600 text-white font-semibold rounded-xl py-4 transition-all flex items-center justify-center gap-2">
              Continue to booking <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase flex flex-col items-center gap-2">
        <span>Scroll</span>
        <div className="w-px h-10 bg-white/40" />
      </div>
    </section>
  );
}

// --- Stats Strip ---
function Stats() {
  const items = [
    { n: "18+", l: "Years of Excellence" },
    { n: "12K+", l: "Happy Travellers" },
    { n: "22", l: "National Parks" },
    { n: "4.9★", l: "Average Rating" },
  ];
  return (
    <section className="bg-safari-900 text-safari-50 py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-serif text-4xl md:text-5xl font-bold text-safari-300 mb-2">{s.n}</div>
            <div className="text-sm tracking-wider uppercase text-safari-200">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Destinations ---
const destinations = [
  {
    name: "Serengeti National Park",
    tagline: "The Great Migration",
    desc: "Witness millions of wildebeest and zebra sweep across endless golden plains in nature's greatest spectacle.",
    img: IMG.serengeti,
    size: "Best for Wildlife",
  },
  {
    name: "Ngorongoro Crater",
    tagline: "Eden on Earth",
    desc: "Descend into the world's largest intact volcanic caldera — a UNESCO jewel teeming with the Big Five.",
    img: IMG.ngorongoro,
    size: "UNESCO Heritage",
  },
  {
    name: "Mount Kilimanjaro",
    tagline: "Roof of Africa",
    desc: "Trek through five climate zones to the snow-capped summit of Africa's tallest free-standing mountain.",
    img: IMG.kilimanjaro,
    size: "Adventure",
  },
  {
    name: "Zanzibar Archipelago",
    tagline: "Spice Island Paradise",
    desc: "Unwind on powder-white beaches, explore Stone Town's winding alleys and dive coral reefs.",
    img: IMG.zanzibar,
    size: "Beach & Culture",
  },
  {
    name: "Tarangire National Park",
    tagline: "Land of Giants",
    desc: "Home to Tanzania's largest elephant herds and ancient baobab trees silhouetted against fiery sunsets.",
    img: IMG.tarangire,
    size: "Elephants",
  },
  {
    name: "Lake Manyara",
    tagline: "Tree-Climbing Lions",
    desc: "A compact gem where flamingos pink the shores and lions nap in acacia branches above the ground.",
    img: IMG.lakeManyara,
    size: "Birdwatcher's Haven",
  },
];

function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-safari-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-safari-500 font-semibold tracking-[0.3em] uppercase text-sm mb-3">
            Our Destinations
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-safari-950 leading-tight mb-5">
            Tanzania's Most <span className="italic text-safari-600">Iconic</span> Landscapes
          </h2>
          <p className="text-safari-700 text-lg">
            From sweeping savannas to turquoise coastlines, every corner of
            Tanzania tells a different story. Pick your chapter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <article
              key={d.name}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-safari-950/80 via-safari-950/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-safari-700">
                  {d.size}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-safari-200 text-xs tracking-widest uppercase mb-1">
                    {d.tagline}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-white">
                    {d.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-safari-700 leading-relaxed mb-4">{d.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-safari-600 font-semibold text-sm group/link"
                >
                  Plan your visit
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Safari Tours / Packages ---
const tours = [
  {
    name: "Classic Serengeti Explorer",
    days: "6 Days / 5 Nights",
    price: 2890,
    img: IMG.serengeti,
    highlights: ["Great Migration viewing", "Big Five game drives", "Luxury tented camps", "Hot-air balloon safari"],
    tag: "Most Popular",
  },
  {
    name: "Grand Tanzania Circuit",
    days: "10 Days / 9 Nights",
    price: 5490,
    img: IMG.ngorongoro,
    highlights: ["Serengeti & Ngorongoro", "Tarangire & Manyara", "Maasai village visit", "Private 4x4 Land Cruiser"],
    tag: "Best Value",
  },
  {
    name: "Kilimanjaro Machame Route",
    days: "7 Days / 6 Nights",
    price: 3250,
    img: IMG.kili2,
    highlights: ["Uhuru Peak summit", "Expert mountain guides", "All gear provided", "Certificate of Achievement"],
    tag: "Adventure",
  },
  {
    name: "Safari & Zanzibar Escape",
    days: "12 Days / 11 Nights",
    price: 6890,
    img: IMG.zanzibar2,
    highlights: ["Serengeti & Ngorongoro", "5-star beach resort", "Spice tour & Stone Town", "Snorkeling & diving"],
    tag: "Honeymoon",
  },
];

function Tours() {
  return (
    <section id="tours" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-safari-500 font-semibold tracking-[0.3em] uppercase text-sm mb-3">
              Curated Itineraries
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-safari-950 leading-tight mb-5">
              Signature <span className="italic text-safari-600">Safari Tours</span>
            </h2>
            <p className="text-safari-700 text-lg">
              Every journey is handcrafted, fully customizable, and led by
              Tanzania's most experienced guides. Prices shown are starting estimates 
              and vary by season, accommodation level, and group size. Contact us for 
              your personalized quote.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-safari-600 font-semibold hover:text-safari-800 transition-colors whitespace-nowrap"
          >
            Custom itinerary <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {tours.map((t) => (
            <article
              key={t.name}
              className="group rounded-3xl overflow-hidden bg-safari-50 border border-safari-100 hover:border-safari-300 transition-all hover:shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-safari-500 text-white text-xs font-bold tracking-wider uppercase rounded-full">
                    {t.tag}
                  </div>
                </div>
                <div className="p-7 flex flex-col">
                  <div className="flex items-center gap-2 text-safari-600 text-xs font-semibold uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4" /> {t.days}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-safari-950 mb-3">
                    {t.name}
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    {t.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-safari-700 text-sm">
                        <Check className="w-4 h-4 text-safari-500 flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between border-t border-safari-200 pt-4">
                    <div>
                      <div className="text-xs text-safari-500 uppercase tracking-wider">Starting from</div>
                      <div className="font-serif text-3xl font-bold text-safari-900">
                        ${t.price.toLocaleString()}
                        <span className="text-sm font-sans font-normal text-safari-600"> /person</span>
                      </div>
                      <div className="text-[10px] text-safari-500 mt-1">*Varies by season & accommodation</div>
                    </div>
                    <a
                      href="#contact"
                      className="px-5 py-2.5 bg-safari-900 hover:bg-safari-700 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      Book Now <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Why Choose Us ---
function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      desc: "TALA-registered operator with full liability coverage and 24/7 emergency response across Tanzania.",
    },
    {
      icon: Compass,
      title: "Expert Local Guides",
      desc: "Born-and-raised Tanzanian guides with 10+ years in the bush and fluent English, Swahili and French.",
    },
    {
      icon: Heart,
      title: "Tailor-Made Journeys",
      desc: "Every itinerary is crafted around your dreams, pace and budget — no cookie-cutter group tours.",
    },
    {
      icon: Camera,
      title: "Photography Focus",
      desc: "Dedicated photographic safaris with prime positioning, bean-bag mounts and golden-hour planning.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious Travel",
      desc: "We offset carbon, partner with conservancies, and contribute 5% of every booking to local communities.",
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      desc: "TripAdvisor Travellers' Choice 2024 and SafariBookings Top 50 Operator in East Africa.",
    },
  ];

  return (
    <section id="why" className="py-24 bg-safari-900 text-safari-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={IMG.lionPortrait} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-safari-300 font-semibold tracking-[0.3em] uppercase text-sm mb-3">
            Why EliteSafaris
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-white leading-tight mb-5">
            The <span className="italic text-safari-300">Elite</span> Difference
          </h2>
          <p className="text-safari-100 text-lg">
            We don't sell tours — we curate transformation. Here's what makes
            travelling with us an experience apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-7 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-safari-300/40 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-safari-500/20 flex items-center justify-center mb-5 group-hover:bg-safari-500 transition-colors">
                  <Icon className="w-7 h-7 text-safari-300 group-hover:text-white" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-safari-100/80 leading-relaxed text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Gallery ---
function Gallery() {
  const images = [
    { src: IMG.lionPortrait, span: "md:col-span-2 md:row-span-2", label: "The King's Gaze" },
    { src: IMG.tarangire, span: "", label: "Baobab Giants" },
    { src: IMG.zanzibar, span: "", label: "Turquoise Zanzibar" },
    { src: IMG.kilimanjaro, span: "", label: "Snow on the Equator" },
    { src: IMG.serengeti, span: "", label: "Endless Plains" },
    { src: IMG.lions, span: "md:col-span-2", label: "Pride at Rest" },
  ];
  return (
    <section id="gallery" className="py-24 bg-safari-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-safari-500 font-semibold tracking-[0.3em] uppercase text-sm mb-3">
            Moments from the Wild
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-safari-950 leading-tight mb-5">
            Through Our <span className="italic text-safari-600">Lens</span>
          </h2>
          <p className="text-safari-700 text-lg">
            A glimpse of the magic waiting for you in Tanzania — captured by our
            guides and guests.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden rounded-2xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-safari-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white font-serif text-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Testimonials ---
function Testimonials() {
  const items = [
    {
      name: "Sophia & Daniel Carter",
      trip: "Honeymoon · 12-day Safari & Zanzibar",
      text: "From the moment we landed in Arusha, every detail was flawless. Watching the migration from our tent at dusk with a gin & tonic in hand — pure magic. EliteSafaris turned our honeymoon into a legend we'll retell forever.",
      rating: 5,
    },
    {
      name: "Marcus Okafor",
      trip: "Solo · Kilimanjaro Machame Route",
      text: "I've climbed mountains on five continents, but the professionalism of the EliteSafaris team on Kili was unmatched. Our guide Baraka was calm, knowledgeable, and became a friend by summit night.",
      rating: 5,
    },
    {
      name: "The Andersson Family",
      trip: "Family · 8-day Northern Circuit",
      text: "Travelling with three kids under 10, we were nervous. The guides made it educational, safe, and genuinely fun. Our youngest still talks about the baby elephant in Tarangire.",
      rating: 5,
    },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-safari-500 font-semibold tracking-[0.3em] uppercase text-sm mb-3">
            Guest Stories
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-safari-950 leading-tight mb-5">
            Words from the <span className="italic text-safari-600">Wild</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {items.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl bg-safari-50 border border-safari-100 hover:shadow-xl transition-shadow relative"
            >
              <div className="font-serif text-6xl text-safari-300 leading-none mb-2">"</div>
              <p className="text-safari-800 leading-relaxed mb-6">{t.text}</p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-safari-400 text-safari-400" />
                ))}
              </div>
              <div className="pt-4 border-t border-safari-200">
                <div className="font-serif text-lg font-semibold text-safari-900">{t.name}</div>
                <div className="text-safari-600 text-sm">{t.trip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact / Booking ---
function Contact({ bookingIntent }: { bookingIntent: BookingIntent | null }) {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "activation" | "error"
  >("idle");
  const [destination, setDestination] = useState("Serengeti");
  const [travelMonth, setTravelMonth] = useState(getDefaultTravelMonth);
  const [travellers, setTravellers] = useState("2 Adults");

  useEffect(() => {
    if (!bookingIntent) return;

    setDestination(bookingIntent.destination);
    setTravelMonth(bookingIntent.travelMonth);
    setTravellers(bookingIntent.travellers);
    setFormStatus("idle");

    const focusTimer = window.setTimeout(() => {
      document.getElementById("booking-name")?.focus({ preventScroll: true });
    }, 700);

    return () => window.clearTimeout(focusTimer);
  }, [bookingIntent]);

  const handleInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const customerName = String(formData.get("name") || "Website visitor");
    const customerEmail = String(formData.get("email") || "");

    // These fields make the notification easy to identify and reply to.
    formData.set("_subject", `New EliteSafaris inquiry from ${customerName}`);
    formData.set("_replyto", customerEmail);
    formData.set("_template", "table");
    formData.set("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/EliteSafaris1@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );
      const result = await response.json().catch(() => ({}));
      const serviceMessage = String(result.message || "").toLowerCase();

      if (serviceMessage.includes("activat")) {
        setFormStatus("activation");
        return;
      }

      if (
        !response.ok ||
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error("The email service did not accept the inquiry.");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-safari-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="text-safari-500 font-semibold tracking-[0.3em] uppercase text-sm mb-3">
            Plan Your Journey
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-safari-950 leading-tight mb-6">
            Ready to Answer the <span className="italic text-safari-600">Call of the Wild?</span>
          </h2>
          <p className="text-safari-700 text-lg mb-10 leading-relaxed">
            Tell us about your dream safari and our travel designers will craft
            a bespoke itinerary within 24 hours. No obligation, no pressure —
            just possibilities.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-safari-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-safari-500 uppercase tracking-widest font-semibold">Call or WhatsApp</div>
                <a href="tel:+255671112412" className="text-safari-900 font-medium text-lg hover:text-safari-600 transition-colors">+255 671 112 412</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-safari-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-safari-500 uppercase tracking-widest font-semibold">Email Us</div>
                <a href="mailto:EliteSafaris1@gmail.com" className="text-safari-900 font-medium text-lg hover:text-safari-600 transition-colors">EliteSafaris1@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-safari-500 flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-safari-500 uppercase tracking-widest font-semibold">Visit Us</div>
                <div className="text-safari-900 font-medium text-lg">Arusha Clock Tower, Boma Road, Tanzania</div>
              </div>
            </div>
          </div>
        </div>

        <form
          id="booking-form"
          action="https://formsubmit.co/EliteSafaris1@gmail.com"
          method="POST"
          onSubmit={handleInquiry}
          className="scroll-mt-24 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-safari-100"
        >
          {formStatus === "success" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-full bg-safari-500 flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-safari-900 mb-3">
                Asante sana!
              </h3>
              <p className="text-safari-700 max-w-sm mx-auto">
                Your details were sent directly to EliteSafaris1@gmail.com. We
                will reply to your email as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setFormStatus("idle")}
                className="mt-6 text-sm font-semibold text-safari-700 underline underline-offset-4"
              >
                Send another inquiry
              </button>
            </div>
          ) : formStatus === "activation" ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto rounded-full bg-safari-100 flex items-center justify-center mb-6">
                <Mail className="w-9 h-9 text-safari-700" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-safari-900 mb-3">
                One-time email activation needed
              </h3>
              <p className="text-safari-700 max-w-md mx-auto leading-relaxed">
                FormSubmit sent an activation email to
                <strong> EliteSafaris1@gmail.com</strong>. Open that inbox and
                click <strong>Activate Form</strong>. After activation, customer
                inquiries will arrive directly in that email inbox.
              </p>
              <button
                type="button"
                onClick={() => setFormStatus("idle")}
                className="mt-6 px-6 py-3 rounded-full bg-safari-900 text-white font-semibold"
              >
                Return to form
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-safari-900 mb-6">
                {bookingIntent
                  ? `Complete your ${destination} booking request`
                  : "Request a Free Quote"}
              </h3>
              {bookingIntent && (
                <p className="-mt-3 mb-6 text-sm leading-relaxed text-safari-600">
                  Your search has been added below. Complete your contact details
                  and send the request for an exact quote.
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="booking-name" className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Full Name *</label>
                  <input id="booking-name" required name="name" type="text" placeholder="Jane Doe" className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Email *</label>
                  <input required name="email" type="email" placeholder="you@email.com" className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Phone / WhatsApp *</label>
                  <input required name="phone" type="tel" placeholder="+255 700 000 000" className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Country</label>
                  <input name="country" type="text" placeholder="Your country" className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Destination</label>
                  <select
                    name="destination"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40"
                  >
                    <option>Serengeti</option>
                    <option>Ngorongoro</option>
                    <option>Kilimanjaro</option>
                    <option>Zanzibar</option>
                    <option>Tarangire</option>
                    <option>Lake Manyara</option>
                    <option>Northern Circuit</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Preferred travel month</label>
                  <input
                    name="travel_month"
                    type="month"
                    required
                    min={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`}
                    value={travelMonth}
                    onChange={(event) => setTravelMonth(event.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Travellers</label>
                  <select
                    name="travellers"
                    value={travellers}
                    onChange={(event) => setTravellers(event.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40"
                  >
                    <option>Solo</option>
                    <option>2 Adults</option>
                    <option>Family (3-5)</option>
                    <option>Group (6+)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Budget per person (USD)</label>
                  <select name="budget" className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40">
                    <option>Not decided</option>
                    <option>Under $1,500</option>
                    <option>$1,500 - $3,000</option>
                    <option>$3,000 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label className="text-xs font-semibold text-safari-600 uppercase tracking-wider">Tell us about your dream trip *</label>
                <textarea required name="message" rows={4} placeholder="Dates, interests, special requests…" className="w-full mt-1 px-4 py-3 rounded-lg border border-safari-200 focus:border-safari-500 focus:outline-none bg-safari-50/40 resize-none" />
              </div>
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {formStatus === "error" && (
                <div role="alert" className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    The inquiry could not be sent. Please try again or email us
                    directly at <a className="font-semibold underline" href="mailto:EliteSafaris1@gmail.com">EliteSafaris1@gmail.com</a>.
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full py-4 bg-safari-600 hover:bg-safari-700 disabled:cursor-wait disabled:opacity-70 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {formStatus === "submitting" ? (
                  <><LoaderCircle className="w-5 h-5 animate-spin" /> Sending securely...</>
                ) : (
                  <>Send My Inquiry <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
              <p className="text-xs text-safari-500 text-center mt-4">
                Messages go directly to EliteSafaris1@gmail.com. We respect your privacy.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-safari-950 text-safari-200 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="mb-5">
              <img 
                src="/logo.png" 
                alt="EliteSafaris" 
                className="h-16 w-auto brightness-110"
              />
            </div>
            <p className="text-sm leading-relaxed mb-5 text-safari-300">
              Premium Tanzania safari experiences crafted by local experts.
              Licensed by TALA, members of TATO and ATTA.
            </p>
            <div className="flex gap-3">
              {[SOCIAL.facebook, SOCIAL.instagram, SOCIAL.twitter, SOCIAL.youtube].map((d, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-safari-500 border border-white/10 flex items-center justify-center transition-colors text-safari-200 hover:text-white"
                >
                  <SocialIcon d={d} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Destinations</h4>
            <ul className="space-y-2 text-sm">
              {["Serengeti", "Ngorongoro", "Kilimanjaro", "Zanzibar", "Tarangire", "Lake Manyara", "Ruaha & Selous"].map((d) => (
                <li key={d}>
                  <a href="#destinations" className="hover:text-safari-300 transition-colors">{d}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Safaris</h4>
            <ul className="space-y-2 text-sm">
              {["Migration Safaris", "Honeymoon Tours", "Family Adventures", "Photography Safaris", "Kilimanjaro Treks", "Beach Escapes", "Custom Itineraries"].map((d) => (
                <li key={d}>
                  <a href="#tours" className="hover:text-safari-300 transition-colors">{d}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-safari-300">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-safari-400" /> Boma Road, Arusha, Tanzania</li>
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-safari-400" /> <a href="tel:+255671112412" className="hover:text-safari-200 transition-colors">+255 671 112 412</a></li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-safari-400" /> <a href="mailto:EliteSafaris1@gmail.com" className="hover:text-safari-200 transition-colors">EliteSafaris1@gmail.com</a></li>
              <li className="flex items-start gap-2"><Globe className="w-4 h-4 mt-0.5 flex-shrink-0 text-safari-400" /> www.elitesafaris.co.tz</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-safari-400">
          <div>© 2026 EliteSafaris Ltd. All rights reserved. TALA License #004521</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-safari-200">Privacy Policy</a>
            <a href="#" className="hover:text-safari-200">Terms of Service</a>
            <a href="#" className="hover:text-safari-200">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [bookingIntent, setBookingIntent] = useState<BookingIntent | null>(null);

  return (
    <div className="min-h-screen bg-safari-50 text-safari-950">
      <Navbar />
      <main>
        <Hero onSearch={setBookingIntent} />
        <Stats />
        <Destinations />
        <Tours />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Contact bookingIntent={bookingIntent} />
      </main>
      <Footer />
    </div>
  );
}
