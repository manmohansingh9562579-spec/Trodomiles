"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, MapPinned, Plane } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/explore/${query.trim().toLowerCase()}`);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Trodo<span className="text-green-400">Miles</span>
          </h1>
          <div className="hidden md:flex gap-10 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Explore</a>
            <a href="#" className="hover:text-white transition-colors">AI Planner</a>
            <a href="#" className="hover:text-white transition-colors">Hidden Gems</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>
          <button className="bg-green-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          {/* Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-green-300 backdrop-blur-xl">
              <Sparkles size={16} />
              AI Powered Travel Intelligence
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-6xl md:text-8xl font-black leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Explore The World <br />
            <motion.span
              className="text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Smarter
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="max-w-2xl mx-auto text-gray-400 mt-8 text-lg leading-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Deep AI analysis of destinations.
            Discover hidden gems, budgets, weather,
            safety, food, and complete travel intelligence.
          </motion.p>

          {/* Search */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full px-6 py-4 w-full max-w-3xl hover:border-white/20 transition-colors duration-300">
              <Search className="text-green-400" />
              <input
                type="text"
                placeholder="Where do you want to explore?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="bg-transparent outline-none flex-1 text-lg text-white placeholder:text-gray-500"
              />
              <button
                onClick={handleSearch}
                className="bg-green-400 hover:bg-green-300 transition text-black px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-95"
              >
                Explore
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {[
              { icon: <MapPinned className="text-green-400 mb-4" />, num: "Smart Discovery", label: "AI Travel Search" },
              { icon: <Plane className="text-green-400 mb-4" />, num: "AI Powered", label: "Smart Planning" },
              { icon: <Sparkles className="text-green-400 mb-4" />, num: "Premium", label: "Cinematic UI" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
                whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(74,222,128,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.icon}
                <h3 className="text-3xl font-bold">{item.num}</h3>
                <p className="text-gray-400 mt-2">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Credit */}
          <motion.div
            className="mt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <p className="text-white/20 text-sm tracking-widest">
              crafted by{" "}
              <span className="text-green-400/50 font-semibold">Man Mohan Singh</span>
            </p>
          </motion.div>

        </motion.div>
      </section>
    </main>
  );
}