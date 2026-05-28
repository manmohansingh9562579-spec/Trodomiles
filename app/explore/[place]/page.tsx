"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Utensils, Star, Camera,
  ChevronDown, X, Navigation, Sun, Snowflake, Waves,
  Mountain, Landmark, TreePine, Wind, Flame, ArrowRight,
  Compass, Sparkles
} from "lucide-react";

type BudgetTier = "cheap" | "medium" | "expensive";

interface BudgetData {
  total: string;
  stay: string;
  food: string;
  transport: string;
  activities: string;
  tips: string[];
  itinerary: { day: string; plan: string[] }[];
}

interface City {
  name: string;
  tagline: string;
  description: string;
  bestTime: string;
  famousFood: string[];
  highlights: string[];
  icon: React.ReactNode;
  accentColor: string;
  photos: { url: string; caption: string }[];
  budget: Record<BudgetTier, BudgetData>;
}

const cityData: Record<string, City> = {
  goa: {
    name: "Goa",
    tagline: "India's Beach Paradise",
    description: "Goa is India's smallest state but biggest on fun — golden beaches, Portuguese heritage, vibrant nightlife, and some of the freshest seafood you'll ever taste.",
    bestTime: "November – February",
    famousFood: ["Fish Curry Rice", "Prawn Balchão", "Bebinca", "Feni Cocktails"],
    highlights: ["Calangute Beach", "Baga Nightlife", "Old Goa Churches", "Dudhsagar Falls", "Anjuna Flea Market"],
    icon: <Waves size={18} />,
    accentColor: "#06b6d4",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Calangute_Baga_beach_in_Goa.jpg/1280px-Calangute_Baga_beach_in_Goa.jpg", caption: "Calangute Beach" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Basilica_of_Bom_Jesus%2C_Old_Goa.jpg/1280px-Basilica_of_Bom_Jesus%2C_Old_Goa.jpg", caption: "Basilica of Bom Jesus" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dudhsagar_Falls_Goa_India.jpg/800px-Dudhsagar_Falls_Goa_India.jpg", caption: "Dudhsagar Falls" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Vagator_beach_Goa.jpg/1280px-Vagator_beach_Goa.jpg", caption: "Vagator Beach" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chapora_fort_Goa.jpg/1280px-Chapora_fort_Goa.jpg", caption: "Chapora Fort" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Fort_Aguada_Goa.jpg/1280px-Fort_Aguada_Goa.jpg", caption: "Fort Aguada" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Palolem_Beach_Goa.jpg/1280px-Palolem_Beach_Goa.jpg", caption: "Palolem Beach" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Fontainhas_Latin_Quarter_Goa.jpg/1280px-Fontainhas_Latin_Quarter_Goa.jpg", caption: "Fontainhas Latin Quarter" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Se_Cathedral_Old_Goa.jpg/1280px-Se_Cathedral_Old_Goa.jpg", caption: "Se Cathedral Old Goa" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Anjuna_Beach_Goa.jpg/1280px-Anjuna_Beach_Goa.jpg", caption: "Anjuna Beach" },
    ],
    budget: {
      cheap: {
        total: "₹8,000 – ₹12,000", stay: "₹500–₹800/night (hostels)", food: "₹200–₹400/day (local shacks)", transport: "₹100–₹200/day (bicycle/bus)", activities: "₹500–₹1,000 total",
        tips: ["Stay in North Goa hostels near Vagator or Arambol", "Eat at local beach shacks — cheapest & tastiest", "Rent a bicycle ₹100/day instead of scooter", "Visit Anjuna Flea Market on Wednesdays — free entry", "Avoid peak Dec 20–Jan 5 — prices triple"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, check into hostel", "Calangute Beach sunset", "Dinner at local shack ₹150"] },
          { day: "Day 2", plan: ["Old Goa Churches (free)", "Panjim city walk", "Anjuna Beach evening"] },
          { day: "Day 3", plan: ["Dudhsagar Falls jeep trip ₹400", "Spice plantation visit", "Night market"] },
          { day: "Day 4", plan: ["Arambol Beach (peaceful & free)", "Sunset point", "Pack & depart"] },
        ],
      },
      medium: {
        total: "₹20,000 – ₹30,000", stay: "₹2,000–₹4,000/night (boutique hotels)", food: "₹600–₹1,200/day", transport: "₹400–₹600/day (scooter)", activities: "₹2,000–₹4,000 total",
        tips: ["Stay in South Goa — quieter, cleaner beaches", "Rent a scooter for full freedom", "Try Thalassa Greek restaurant — worth it", "Book water sports package for better rates", "Visit Fontainhas Latin Quarter for heritage walk"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, boutique hotel check-in", "Baga/Calangute beach", "Dinner at Martin's Corner"] },
          { day: "Day 2", plan: ["Old Goa & Se Cathedral", "Panjim Fontainhas walk", "Sunset cruise ₹800"] },
          { day: "Day 3", plan: ["Water sports at Baga ₹1,500", "Anjuna Flea Market", "Tito's street food night"] },
          { day: "Day 4", plan: ["South Goa — Palolem Beach", "Butterfly Beach trek", "Depart evening"] },
        ],
      },
      expensive: {
        total: "₹60,000 – ₹1,20,000", stay: "₹8,000–₹25,000/night (5-star resorts)", food: "₹2,000–₹5,000/day (fine dining)", transport: "₹2,000–₹4,000/day (private cab)", activities: "₹10,000–₹20,000 total",
        tips: ["Stay at Taj Exotica or W Goa for ultimate luxury", "Book private yacht for sunset ₹15,000", "Casino Royale night experience", "Helicopter transfer from Dabolim airport", "Private chef dinner on the beach"],
        itinerary: [
          { day: "Day 1", plan: ["Private transfer to 5-star resort", "In-resort spa treatment", "Fine dining dinner"] },
          { day: "Day 2", plan: ["Private yacht tour of beaches", "Water villa lunch", "Casino night"] },
          { day: "Day 3", plan: ["Helicopter tour of Goa coastline", "Dudhsagar by private jeep", "Chef's table dinner"] },
          { day: "Day 4", plan: ["Morning yoga on beach", "Private shopping tour Panjim", "Departure lounge"] },
        ],
      },
    },
  },

  manali: {
    name: "Manali",
    tagline: "Valley of the Gods",
    description: "Manali is Himachal Pradesh's crown jewel — snow-capped peaks, apple orchards, adventure sports, and the mystical Rohtang Pass that touches the sky.",
    bestTime: "October – June",
    famousFood: ["Siddu", "Trout Fish", "Chha Gosht", "Aktori"],
    highlights: ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "Old Manali", "Beas River Rafting"],
    icon: <Mountain size={18} />,
    accentColor: "#818cf8",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Manali_himachal.jpg/1280px-Manali_himachal.jpg", caption: "Manali Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Rohtang_Pass.jpg/1280px-Rohtang_Pass.jpg", caption: "Rohtang Pass" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hadimba_Devi_Temple.jpg/800px-Hadimba_Devi_Temple.jpg", caption: "Hadimba Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Solang_Valley.jpg/1280px-Solang_Valley.jpg", caption: "Solang Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Beas_River_near_Manali.jpg/1280px-Beas_River_near_Manali.jpg", caption: "Beas River" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Naggar_Castle.jpg/1280px-Naggar_Castle.jpg", caption: "Naggar Castle" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Kullu_Valley.jpg/1280px-Kullu_Valley.jpg", caption: "Kullu Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Apple_Orchard_Himachal.jpg/1280px-Apple_Orchard_Himachal.jpg", caption: "Apple Orchards" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Old_Manali.jpg/1280px-Old_Manali.jpg", caption: "Old Manali" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Manu_Temple_Manali.jpg/800px-Manu_Temple_Manali.jpg", caption: "Manu Temple" },
    ],
    budget: {
      cheap: {
        total: "₹6,000 – ₹10,000", stay: "₹400–₹700/night (hostels/dorms)", food: "₹150–₹300/day (dhabas)", transport: "₹0–₹100/day (walk/shared taxi)", activities: "₹500–₹1,500 total",
        tips: ["HRTC bus from Delhi ₹700 — cheapest option", "Stay in Old Manali — cheaper & more scenic", "Eat at local dhabas — Siddu just ₹30", "Hadimba Temple & Old Manali walk are free", "Avoid May–June peak when prices spike"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, check hostel", "Old Manali walk", "Manu Temple"] },
          { day: "Day 2", plan: ["Hadimba Temple (free)", "Van Vihar park walk", "Mall Road evening"] },
          { day: "Day 3", plan: ["Solang Valley (shared taxi ₹200)", "Snow activities", "Dhabas dinner"] },
          { day: "Day 4", plan: ["Beas Kund trek (free)", "River side evening", "Depart"] },
        ],
      },
      medium: {
        total: "₹18,000 – ₹28,000", stay: "₹2,000–₹3,500/night (hotels)", food: "₹500–₹900/day", transport: "₹600–₹1,000/day (cab rental)", activities: "₹3,000–₹6,000 total",
        tips: ["Book Volvo bus Delhi-Manali ₹1,200", "Stay near Mall Road for convenience", "Café 1947 & Drifters Inn for great food", "Rohtang Pass permit required — book online", "River rafting at Pirdi ₹600 per person"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, hotel check-in", "Mall Road & Hadimba Temple", "Johnsons Café dinner"] },
          { day: "Day 2", plan: ["Rohtang Pass day trip ₹2,500", "Snow activities", "Apple orchard visit"] },
          { day: "Day 3", plan: ["Solang Valley skiing/zorbing", "Beas River rafting ₹600", "Old Manali cafes"] },
          { day: "Day 4", plan: ["Naggar Castle visit", "Kullu shopping", "Depart"] },
        ],
      },
      expensive: {
        total: "₹50,000 – ₹90,000", stay: "₹6,000–₹15,000/night (luxury resorts)", food: "₹1,500–₹3,500/day", transport: "₹3,000–₹5,000/day (SUV hire)", activities: "₹15,000–₹25,000 total",
        tips: ["Fly to Bhuntar airport then private transfer", "Stay at Span Resort & Spa or Club Mahindra", "Private heliskiing experience", "Guided Beas Kund trek with camping", "Paragliding + photography package"],
        itinerary: [
          { day: "Day 1", plan: ["Private SUV pickup from airport", "Luxury resort check-in & spa", "Fine dining dinner"] },
          { day: "Day 2", plan: ["Private Rohtang Pass tour", "Heliskiing experience", "Mountain view dinner"] },
          { day: "Day 3", plan: ["Paragliding Solang ₹3,500", "Guided nature trail", "Bonfire & BBQ night"] },
          { day: "Day 4", plan: ["Morning yoga with mountain view", "Kullu Manali valley tour", "Private departure"] },
        ],
      },
    },
  },

  kerala: {
    name: "Kerala",
    tagline: "God's Own Country",
    description: "Kerala is India's emerald paradise — serene backwaters, lush tea gardens, Ayurvedic wellness, and a cuisine that will ruin all other food for you.",
    bestTime: "September – March",
    famousFood: ["Karimeen Pollichathu", "Puttu Kadala", "Kerala Sadya", "Appam Stew"],
    highlights: ["Alleppey Backwaters", "Munnar Tea Gardens", "Kovalam Beach", "Periyar Wildlife", "Fort Kochi"],
    icon: <TreePine size={18} />,
    accentColor: "#34d399",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Kerala_backwaters_boats.jpg/1280px-Kerala_backwaters_boats.jpg", caption: "Alleppey Backwaters" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Munnar_tea_plantation.jpg/1280px-Munnar_tea_plantation.jpg", caption: "Munnar Tea Gardens" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Chinese_fishing_nets_Kochi.jpg/1280px-Chinese_fishing_nets_Kochi.jpg", caption: "Fort Kochi Fishing Nets" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kovalam_beach_Kerala.jpg/1280px-Kovalam_beach_Kerala.jpg", caption: "Kovalam Beach" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kerala_houseboat.jpg/1280px-Kerala_houseboat.jpg", caption: "Alleppey Houseboat" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Periyar_Lake_Kerala.jpg/1280px-Periyar_Lake_Kerala.jpg", caption: "Periyar Wildlife" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Varkala_cliff_beach.jpg/1280px-Varkala_cliff_beach.jpg", caption: "Varkala Cliff Beach" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Kathakali_dance_Kerala.jpg/800px-Kathakali_dance_Kerala.jpg", caption: "Kathakali Dance" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Wayanad_Kerala_hills.jpg/1280px-Wayanad_Kerala_hills.jpg", caption: "Wayanad Hills" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Eravikulam_National_Park_Kerala.jpg/1280px-Eravikulam_National_Park_Kerala.jpg", caption: "Eravikulam Park" },
    ],
    budget: {
      cheap: {
        total: "₹7,000 – ₹12,000", stay: "₹400–₹800/night (homestays)", food: "₹100–₹250/day (banana leaf meals)", transport: "₹200–₹400/day (KSRTC buses)", activities: "₹500–₹1,500 total",
        tips: ["KSRTC buses connect all cities cheaply", "Eat banana leaf meals ₹80–₹120 — best value", "Alappuzha shared boat ₹15 vs houseboat ₹5,000", "Munnar is free to walk & explore tea gardens", "Stay in homestays — local experience + cheap"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive Kochi, Fort Kochi walk (free)", "Chinese fishing nets", "Local Kerala meal ₹100"] },
          { day: "Day 2", plan: ["KSRTC bus to Alleppey ₹70", "Backwater shikara ₹300", "Homestay night"] },
          { day: "Day 3", plan: ["Bus to Munnar ₹150", "Tea garden walk", "Mattupetty Dam ₹30"] },
          { day: "Day 4", plan: ["Eravikulam National Park ₹125", "Depart from Kochi"] },
        ],
      },
      medium: {
        total: "₹22,000 – ₹35,000", stay: "₹2,500–₹5,000/night", food: "₹600–₹1,200/day", transport: "₹800–₹1,500/day (cab)", activities: "₹4,000–₹7,000 total",
        tips: ["Book houseboat in Alleppey — one night minimum", "Periyar Wildlife Safari early morning slot", "Kathakali dance show ₹350 in Kochi", "Ayurvedic massage package worth every rupee", "Thekkady spice boat ride ₹200"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive Kochi, Mattancherry & Fort Kochi", "Kathakali show ₹350", "Seafood dinner"] },
          { day: "Day 2", plan: ["Drive to Alleppey", "Houseboat overnight (meals included)"] },
          { day: "Day 3", plan: ["Houseboat morning", "Drive to Munnar", "Tea Museum ₹75"] },
          { day: "Day 4", plan: ["Eravikulam Park", "Munnar viewpoints", "Depart"] },
        ],
      },
      expensive: {
        total: "₹70,000 – ₹1,50,000", stay: "₹10,000–₹40,000/night", food: "₹2,500–₹6,000/day", transport: "₹4,000–₹8,000/day", activities: "₹20,000–₹40,000 total",
        tips: ["Stay at Kumarakom Lake Resort or Taj Bekal", "Premium houseboat with AC & butler service", "Private Ayurvedic retreat package 3 nights", "Wayanad treehouse experience", "Private wildlife photography safari"],
        itinerary: [
          { day: "Day 1", plan: ["Fly to Kochi, luxury transfer", "Brunton Boatyard heritage hotel", "Chef's table dinner"] },
          { day: "Day 2", plan: ["Luxury houseboat Alleppey — private chef", "Sunset on backwaters", "Live music"] },
          { day: "Day 3", plan: ["Private drive to Munnar", "Tea estate private tour", "Ayurvedic spa evening"] },
          { day: "Day 4", plan: ["Periyar private safari", "Thekkady river cruise", "Depart"] },
        ],
      },
    },
  },

  kedarnath: {
    name: "Kedarnath",
    tagline: "Abode of Lord Shiva",
    description: "Kedarnath is one of India's most sacred destinations — a Jyotirlinga shrine at 3,583m amidst the majestic Garhwal Himalayas, reachable only on foot or by helicopter.",
    bestTime: "May – June, September – October",
    famousFood: ["Aloo ke Gutke", "Jhangora Kheer", "Garhwali Dal", "Mandua Roti"],
    highlights: ["Kedarnath Temple", "Gandhi Sarovar Lake", "Bhairavnath Temple", "Chorabari Glacier", "Vasuki Tal"],
    icon: <Flame size={18} />,
    accentColor: "#fb923c",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Kedarnath_Temple_2014.jpg/1280px-Kedarnath_Temple_2014.jpg", caption: "Kedarnath Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Kedarnath_trek_route.jpg/1280px-Kedarnath_trek_route.jpg", caption: "Trek to Kedarnath" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Kedarnath_valley.jpg/1280px-Kedarnath_valley.jpg", caption: "Kedarnath Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Gaurikund_Kedarnath.jpg/1280px-Gaurikund_Kedarnath.jpg", caption: "Gaurikund Hot Springs" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Triyuginarayan_temple.jpg/1280px-Triyuginarayan_temple.jpg", caption: "Triyuginarayan Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kedarnath_snow_covered.jpg/1280px-Kedarnath_snow_covered.jpg", caption: "Kedarnath in Snow" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vasuki_Tal_lake.jpg/1280px-Vasuki_Tal_lake.jpg", caption: "Vasuki Tal Lake" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Kedarnath_helicopter.jpg/1280px-Kedarnath_helicopter.jpg", caption: "Helicopter Service" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chorabari_glacier.jpg/1280px-Chorabari_glacier.jpg", caption: "Chorabari Glacier" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kedarnath_aarti.jpg/800px-Kedarnath_aarti.jpg", caption: "Evening Aarti" },
    ],
    budget: {
      cheap: {
        total: "₹5,000 – ₹9,000", stay: "₹300–₹600/night (dharamshalas)", food: "₹100–₹200/day (prasad + dhabas)", transport: "₹500–₹1,000 (shared jeeps)", activities: "₹200–₹500 total",
        tips: ["Stay in GMVN guesthouses or dharamshalas", "Trek on foot — 16km from Gaurikund (free)", "Carry own food from Sonprayag — saves money", "Register online at devasthanam board (free)", "Avoid peak May–June — extreme rush"],
        itinerary: [
          { day: "Day 1", plan: ["Reach Gaurikund by shared jeep", "Rest & acclimatize"] },
          { day: "Day 2", plan: ["Early morning trek 16km to Kedarnath", "Temple darshan", "Overnight stay at top"] },
          { day: "Day 3", plan: ["Gandhi Sarovar lake visit", "Bhairavnath Temple", "Trek back down"] },
          { day: "Day 4", plan: ["Return to Sonprayag", "Depart"] },
        ],
      },
      medium: {
        total: "₹15,000 – ₹25,000", stay: "₹1,500–₹3,000/night (hotels)", food: "₹300–₹600/day", transport: "₹2,000–₹4,000 (private cab)", activities: "₹1,000–₹3,000",
        tips: ["Book GMVN tourist bungalow at Kedarnath", "Pony/palki available ₹2,500 one way if needed", "Hire a registered guide ₹800/day", "VIP darshan pass worth it — saves 4-6 hrs queue", "Carry warm clothes — temp drops to 0°C night"],
        itinerary: [
          { day: "Day 1", plan: ["Drive Haridwar to Guptkashi", "Hotel check-in", "Triyuginarayan Temple"] },
          { day: "Day 2", plan: ["Gaurikund → Trek to Kedarnath", "Evening aarti at temple"] },
          { day: "Day 3", plan: ["Early morning abhishek darshan", "Gandhi Sarovar", "Trek down"] },
          { day: "Day 4", plan: ["Drive back via Ukhimath", "Depart"] },
        ],
      },
      expensive: {
        total: "₹40,000 – ₹80,000", stay: "₹5,000–₹12,000/night (premium camps)", food: "₹1,000–₹2,000/day", transport: "₹8,000–₹20,000 (helicopter)", activities: "₹5,000–₹10,000",
        tips: ["Helicopter from Phata/Sersi — 7 min vs 6 hr trek", "Book helicopter 2-3 months in advance", "Stay at luxury camp near Kedarnath", "Char Dham helicopter package covers all 4", "Private priest for personal abhishek puja"],
        itinerary: [
          { day: "Day 1", plan: ["Fly to Dehradun, luxury transfer to Phata", "Luxury camp check-in"] },
          { day: "Day 2", plan: ["Helicopter to Kedarnath 6am", "Private VIP darshan & Gandhi Sarovar", "Return heli"] },
          { day: "Day 3", plan: ["Badrinath helicopter extension", "Brahma Kapal puja"] },
          { day: "Day 4", plan: ["Return Dehradun", "Depart"] },
        ],
      },
    },
  },

  ujjain: {
    name: "Ujjain",
    tagline: "City of Mahakal",
    description: "Ujjain is Madhya Pradesh's holiest city — home to the mighty Mahakaleshwar Jyotirlinga, the mystical Bhasma Aarti, and a spiritual energy unlike anywhere else.",
    bestTime: "October – March",
    famousFood: ["Poha Jalebi", "Dal Baati Churma", "Shrikhand", "Malpua"],
    highlights: ["Mahakaleshwar Temple", "Bhasma Aarti", "Kal Bhairav Temple", "Ram Ghat Aarti", "Vedh Shala Observatory"],
    icon: <Landmark size={18} />,
    accentColor: "#f59e0b",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mahakaleshwar_Jyotirlinga.jpg/800px-Mahakaleshwar_Jyotirlinga.jpg", caption: "Mahakaleshwar Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ram_Ghat_Ujjain.jpg/1280px-Ram_Ghat_Ujjain.jpg", caption: "Ram Ghat Aarti" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kal_Bhairav_temple_Ujjain.jpg/800px-Kal_Bhairav_temple_Ujjain.jpg", caption: "Kal Bhairav Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Harsiddhi_Temple_Ujjain.jpg/800px-Harsiddhi_Temple_Ujjain.jpg", caption: "Harsiddhi Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Kshipra_river_Ujjain.jpg/1280px-Kshipra_river_Ujjain.jpg", caption: "Kshipra River Ghats" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vedh_shala_Ujjain.jpg/1280px-Vedh_shala_Ujjain.jpg", caption: "Vedh Shala Observatory" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sandipani_Ashram_Ujjain.jpg/1280px-Sandipani_Ashram_Ujjain.jpg", caption: "Sandipani Ashram" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Kumbh_Mela_Ujjain_2016.jpg/1280px-Kumbh_Mela_Ujjain_2016.jpg", caption: "Kumbh Mela Ujjain" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Mangalnath_temple_ujjain.jpg/800px-Mangalnath_temple_ujjain.jpg", caption: "Mangalnath Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Gadkalika_temple.jpg/800px-Gadkalika_temple.jpg", caption: "Gadkalika Temple" },
    ],
    budget: {
      cheap: {
        total: "₹2,500 – ₹5,000", stay: "₹300–₹600/night (dharamshalas)", food: "₹100–₹200/day (street food)", transport: "₹100–₹200 (auto/tempo)", activities: "₹100–₹300 total",
        tips: ["Dharamshalas near Mahakal temple are cheap & clean", "Bhasma Aarti is free — register online in advance", "Eat poha-jalebi breakfast for ₹30", "All major temples are free entry", "Auto-tempo covers whole city for ₹10–₹20"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, check dharamshala", "Ram Ghat evening aarti (free)", "Street food dinner"] },
          { day: "Day 2", plan: ["4am Bhasma Aarti (pre-register)", "Mahakal temple darshan", "Kal Bhairav Temple"] },
          { day: "Day 3", plan: ["Vedh Shala Observatory", "Harsiddhi Temple", "Gadkalika Temple", "Depart"] },
        ],
      },
      medium: {
        total: "₹6,000 – ₹12,000", stay: "₹1,000–₹2,000/night (hotels)", food: "₹300–₹600/day", transport: "₹300–₹600/day (cab)", activities: "₹500–₹1,000",
        tips: ["Hotel near Freeganj area — best location", "VIP pass for Bhasma Aarti ₹250 — closer view", "Hire auto for full city tour ₹400", "Kumbh Mela if visiting in 12-year cycle", "Buy Ujjaini prasad & murti as souvenirs"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, hotel check-in", "Ram Ghat boat ride ₹100", "Aarti & dinner"] },
          { day: "Day 2", plan: ["Bhasma Aarti 4am (VIP pass)", "Mahakal full darshan", "Mangalnath Temple"] },
          { day: "Day 3", plan: ["Kal Bhairav + Harsiddhi", "Vedh Shala + Sandipani Ashram", "Depart"] },
        ],
      },
      expensive: {
        total: "₹15,000 – ₹30,000", stay: "₹3,000–₹8,000/night (luxury hotels)", food: "₹800–₹2,000/day", transport: "₹1,500–₹3,000/day", activities: "₹2,000–₹5,000",
        tips: ["Stay at Radisson or Hotel Grand Tower Ujjain", "Book private priest for personal puja", "Combine Omkareshwar & Maheshwar day trips", "Private guided spiritual tour of all temples", "MP Tourism luxury package"],
        itinerary: [
          { day: "Day 1", plan: ["Private cab from Indore airport", "Luxury hotel, spa", "Ram Ghat private boat"] },
          { day: "Day 2", plan: ["Private Bhasma Aarti VIP darshan", "Personal puja with pandit", "Kshipra River ritual bath"] },
          { day: "Day 3", plan: ["Omkareshwar day trip (80km)", "Private priest ceremony", "Fine dining"] },
          { day: "Day 4", plan: ["Maheshwar fort & ghats", "Local craft shopping", "Depart"] },
        ],
      },
    },
  },

  indore: {
    name: "Indore",
    tagline: "India's Cleanest City & Food Capital",
    description: "Indore is Madhya Pradesh's commercial heart and India's #1 cleanest city — famous for its incredible street food scene, Sarafa Bazaar night market, and Rajwada palace.",
    bestTime: "October – March",
    famousFood: ["Poha", "Bhutte Ka Kees", "Garadu Chaat", "Dahi Bada", "Mawa Bati"],
    highlights: ["Sarafa Bazaar", "Rajwada Palace", "Lal Bagh Palace", "Patalpani Waterfall", "Chappan Dukan"],
    icon: <Star size={18} />,
    accentColor: "#f472b6",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rajwada_Indore.jpg/1280px-Rajwada_Indore.jpg", caption: "Rajwada Palace" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Sarafa_Bazar_Indore.jpg/1280px-Sarafa_Bazar_Indore.jpg", caption: "Sarafa Bazaar Night Market" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lal_Bagh_Palace_Indore.jpg/1280px-Lal_Bagh_Palace_Indore.jpg", caption: "Lal Bagh Palace" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Patalpani_waterfall.jpg/1280px-Patalpani_waterfall.jpg", caption: "Patalpani Waterfall" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Chappan_dukan_indore.jpg/1280px-Chappan_dukan_indore.jpg", caption: "Chappan Dukan" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Kanch_mandir_indore.jpg/800px-Kanch_mandir_indore.jpg", caption: "Kanch Mandir Glass Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mandu_fort_MP.jpg/1280px-Mandu_fort_MP.jpg", caption: "Mandu Fort (Day Trip)" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Khajrana_Ganesh_temple.jpg/800px-Khajrana_Ganesh_temple.jpg", caption: "Khajrana Ganesh Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Omkareshwar_temple_MP.jpg/800px-Omkareshwar_temple_MP.jpg", caption: "Omkareshwar Temple (Day Trip)" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tincha_falls_indore.jpg/1280px-Tincha_falls_indore.jpg", caption: "Tincha Falls" },
    ],
    budget: {
      cheap: {
        total: "₹2,000 – ₹4,000", stay: "₹400–₹700/night (budget hotels)", food: "₹100–₹200/day (street food heaven)", transport: "₹50–₹100/day (auto)", activities: "₹200–₹500 total",
        tips: ["Sarafa Bazaar is completely free to explore", "Street food costs ₹20–₹50 per item", "Rajwada entry just ₹10", "City bus covers most areas ₹10", "Indore is walkable in central areas"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, budget hotel near Rajwada", "Rajwada Palace ₹10", "Sarafa Bazaar night food walk"] },
          { day: "Day 2", plan: ["Poha-Jalebi breakfast at Vijay Chaat", "Lal Bagh Palace ₹25", "Chappan Dukan lunch"] },
          { day: "Day 3", plan: ["Patalpani Waterfall (free)", "Tincha Falls", "Return & depart"] },
        ],
      },
      medium: {
        total: "₹6,000 – ₹12,000", stay: "₹1,200–₹2,500/night", food: "₹400–₹800/day", transport: "₹400–₹700/day (cab)", activities: "₹500–₹1,500",
        tips: ["Stay near Vijay Nagar — cleanest & best area", "Hire cab for Mandu day trip ₹1,500", "Central Museum ₹50 — underrated gem", "Khajrana Ganesh Temple evening visit", "Try Shreemaya restaurant for fine Indori food"],
        itinerary: [
          { day: "Day 1", plan: ["Hotel check-in Vijay Nagar", "Rajwada & old city walk", "Sarafa night food tour"] },
          { day: "Day 2", plan: ["Lal Bagh Palace + Museum", "Chappan Dukan lunch", "Khajrana temple evening"] },
          { day: "Day 3", plan: ["Day trip to Mandu fort ₹1,500 cab", "Historical ruins & Jahaz Mahal", "Return dinner"] },
          { day: "Day 4", plan: ["Omkareshwar temple (80km)", "Narmada river holy dip", "Depart"] },
        ],
      },
      expensive: {
        total: "₹15,000 – ₹30,000", stay: "₹3,000–₹8,000/night", food: "₹1,000–₹3,000/day", transport: "₹2,000–₹4,000/day", activities: "₹3,000–₹8,000",
        tips: ["Stay at Marriott or Radisson Blu Indore", "Private guided food tour of Sarafa ₹2,000", "Combine Ujjain + Mandu + Omkareshwar circuit", "Luxury MP Tourism package", "Private heritage walk of old Indore"],
        itinerary: [
          { day: "Day 1", plan: ["Flight to Indore, luxury hotel", "Private Sarafa food tour guide", "Rooftop dinner"] },
          { day: "Day 2", plan: ["Lal Bagh Palace private tour", "Mandu heritage day trip with guide", "Fine dining"] },
          { day: "Day 3", plan: ["Omkareshwar private boat & puja", "Maheshwar fort & ghats", "Return"] },
          { day: "Day 4", plan: ["Spa morning", "Shopping MG Road", "Depart"] },
        ],
      },
    },
  },

  kashmir: {
    name: "Kashmir",
    tagline: "Paradise on Earth",
    description: "Kashmir is India's crown — Dal Lake shikaras, snow-draped Gulmarg slopes, saffron fields of Pampore, and Mughal gardens make it a destination unlike any other on Earth.",
    bestTime: "April – October",
    famousFood: ["Wazwan", "Rogan Josh", "Yakhni", "Kahwa", "Sheer Chai"],
    highlights: ["Dal Lake Shikara", "Gulmarg Gondola", "Pahalgam Valley", "Sonamarg", "Mughal Gardens"],
    icon: <Snowflake size={18} />,
    accentColor: "#38bdf8",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Dal_Lake_Srinagar.jpg/1280px-Dal_Lake_Srinagar.jpg", caption: "Dal Lake Srinagar" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gulmarg_Kashmir_valley.jpg/1280px-Gulmarg_Kashmir_valley.jpg", caption: "Gulmarg Snow Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Pahalgam_valley_Kashmir.jpg/1280px-Pahalgam_valley_Kashmir.jpg", caption: "Pahalgam Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Sonamarg_Kashmir.jpg/1280px-Sonamarg_Kashmir.jpg", caption: "Sonamarg Meadows" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Shalimar_Bagh_Srinagar.jpg/1280px-Shalimar_Bagh_Srinagar.jpg", caption: "Shalimar Mughal Garden" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Shikara_on_Dal_Lake.jpg/1280px-Shikara_on_Dal_Lake.jpg", caption: "Shikara Ride Dal Lake" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Betaab_Valley_Pahalgam.jpg/1280px-Betaab_Valley_Pahalgam.jpg", caption: "Betaab Valley Pahalgam" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hazratbal_Shrine_Srinagar.jpg/1280px-Hazratbal_Shrine_Srinagar.jpg", caption: "Hazratbal Mosque" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tulip_Garden_Srinagar.jpg/1280px-Tulip_Garden_Srinagar.jpg", caption: "Tulip Garden Srinagar" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Nishat_Bagh_Kashmir.jpg/1280px-Nishat_Bagh_Kashmir.jpg", caption: "Nishat Bagh Garden" },
    ],
    budget: {
      cheap: {
        total: "₹8,000 – ₹14,000", stay: "₹500–₹900/night (budget houseboat)", food: "₹150–₹300/day (local dhabas)", transport: "₹200–₹500/day (shared cab/bus)", activities: "₹500–₹1,500 total",
        tips: ["Fly SpiceJet/IndiGo to Srinagar — cheapest", "Stay in Dal Lake budget houseboat", "Shared shikara ₹100 vs private ₹800", "JKSRTC buses to Pahalgam & Sonamarg", "Wazwan thali at local restaurants ₹250"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive Srinagar, budget houseboat", "Dal Lake shikara ₹100 shared", "Lal Chowk evening"] },
          { day: "Day 2", plan: ["Mughal Gardens (₹24)", "Shankaracharya Temple", "Local wazwan dinner"] },
          { day: "Day 3", plan: ["Shared cab to Gulmarg ₹300", "Gondola Phase 1 ₹950", "Return evening"] },
          { day: "Day 4", plan: ["Pahalgam shared cab ₹250", "Betaab Valley", "Depart"] },
        ],
      },
      medium: {
        total: "₹25,000 – ₹40,000", stay: "₹3,000–₹6,000/night (heritage houseboat)", food: "₹700–₹1,500/day", transport: "₹1,500–₹3,000/day (private cab)", activities: "₹5,000–₹10,000",
        tips: ["Stay on Dal Lake heritage houseboat — magical", "Gulmarg Gondola Phase 1+2 ₹1,950", "Sonamarg Thajiwas Glacier pony ₹800", "Pahalgam Aru & Betaab Valley cab ₹600", "Buy Kashmiri pashmina & saffron directly"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, heritage houseboat check-in", "Private shikara sunset ₹800", "Wazwan dinner"] },
          { day: "Day 2", plan: ["Mughal Gardens tour", "Hazratbal Mosque", "Boulevard Road evening"] },
          { day: "Day 3", plan: ["Gulmarg full day — both gondola phases", "Snow activities", "Return"] },
          { day: "Day 4", plan: ["Pahalgam Betaab + Aru Valley", "River side lunch", "Depart"] },
        ],
      },
      expensive: {
        total: "₹80,000 – ₹1,80,000", stay: "₹12,000–₹40,000/night (luxury resorts)", food: "₹3,000–₹7,000/day", transport: "₹5,000–₹10,000/day", activities: "₹25,000–₹50,000",
        tips: ["Stay at Khyber Himalayan Resort Gulmarg", "Helicopter Srinagar–Gulmarg circuit", "Private wazwan chef experience on houseboat", "Heliskiing at Gulmarg — world class", "Private trout fishing in Pahalgam rivers"],
        itinerary: [
          { day: "Day 1", plan: ["Private transfer, luxury houseboat suite", "Private shikara with butler", "Chef's wazwan dinner"] },
          { day: "Day 2", plan: ["Helicopter to Gulmarg", "Heliskiing/snowboarding", "Mountain lodge lunch"] },
          { day: "Day 3", plan: ["Sonamarg helicopter tour", "Private glacier trek with guide", "Luxury camp stay"] },
          { day: "Day 4", plan: ["Private Valley tour", "Pahalgam fly-fishing", "Depart"] },
        ],
      },
    },
  },

  ladakh: {
    name: "Ladakh",
    tagline: "Land of High Passes",
    description: "Ladakh is Earth's most dramatic landscape — moonlike valleys, turquoise Pangong Lake, ancient Buddhist monasteries, and roads that test both your bike and your soul.",
    bestTime: "June – September",
    famousFood: ["Thukpa", "Momos", "Tsampa", "Butter Tea", "Skyu"],
    highlights: ["Pangong Tso Lake", "Nubra Valley", "Khardung La Pass", "Hemis Monastery", "Magnetic Hill"],
    icon: <Wind size={18} />,
    accentColor: "#a78bfa",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pangong_lake_ladakh.jpg/1280px-Pangong_lake_ladakh.jpg", caption: "Pangong Tso Lake" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Nubra_valley_Ladakh.jpg/1280px-Nubra_valley_Ladakh.jpg", caption: "Nubra Valley" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Khardung_la_pass.jpg/1280px-Khardung_la_pass.jpg", caption: "Khardung La Pass" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hemis_Monastery_Ladakh.jpg/1280px-Hemis_Monastery_Ladakh.jpg", caption: "Hemis Monastery" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Thiksey_monastery_Ladakh.jpg/1280px-Thiksey_monastery_Ladakh.jpg", caption: "Thiksey Monastery" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Leh_Palace_Ladakh.jpg/1280px-Leh_Palace_Ladakh.jpg", caption: "Leh Palace" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Shanti_Stupa_Leh.jpg/1280px-Shanti_Stupa_Leh.jpg", caption: "Shanti Stupa" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hunder_Bactrian_camels.jpg/1280px-Hunder_Bactrian_camels.jpg", caption: "Hunder Bactrian Camels" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Zanskar_river_Ladakh.jpg/1280px-Zanskar_river_Ladakh.jpg", caption: "Zanskar River" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Magnetic_Hill_Leh.jpg/1280px-Magnetic_Hill_Leh.jpg", caption: "Magnetic Hill" },
    ],
    budget: {
      cheap: {
        total: "₹10,000 – ₹18,000", stay: "₹400–₹800/night (guesthouses)", food: "₹150–₹300/day (local cafes)", transport: "₹1,000–₹3,000 (shared jeep/bike)", activities: "₹500–₹1,500 total",
        tips: ["Fly to Leh — Manali-Leh road is adventurous", "Acclimatize first 2 days — mandatory!", "Stay in local homestays — cheapest & authentic", "Inner Line Permit for Pangong & Nubra ₹450", "Rent a Royal Enfield ₹800/day + fuel"],
        itinerary: [
          { day: "Day 1-2", plan: ["Arrive Leh, REST & acclimatize (mandatory)", "Local Leh market walk only"] },
          { day: "Day 3", plan: ["Leh Palace ₹15", "Shanti Stupa (free)", "Hemis Monastery ₹50"] },
          { day: "Day 4", plan: ["Magnetic Hill (free)", "Gurudwara Pathar Sahib", "Sangam confluence"] },
          { day: "Day 5-6", plan: ["Pangong Tso 2-day trip shared jeep ₹1,500", "Sunrise at lake", "Return"] },
        ],
      },
      medium: {
        total: "₹28,000 – ₹45,000", stay: "₹2,000–₹4,000/night", food: "₹500–₹1,000/day", transport: "₹3,000–₹6,000 (bike/cab)", activities: "₹3,000–₹7,000",
        tips: ["Rent Royal Enfield — best way to explore", "Khardung La — world's highest motorable road", "Nubra Valley Bactrian camel ride ₹300", "Rafting on Zanskar River ₹700", "Stay in luxury tent at Pangong ₹3,000"],
        itinerary: [
          { day: "Day 1-2", plan: ["Arrive, acclimatize", "Leh market & monasteries"] },
          { day: "Day 3", plan: ["Khardung La ride", "Nubra Valley", "Hunder sand dunes camel ride"] },
          { day: "Day 4", plan: ["Pangong Lake via Shyok route", "Sunset at lake", "Luxury tent overnight"] },
          { day: "Day 5-6", plan: ["Pangong sunrise", "Return Leh via Chang La", "Zanskar River rafting"] },
        ],
      },
      expensive: {
        total: "₹80,000 – ₹1,60,000", stay: "₹8,000–₹25,000/night (luxury camps)", food: "₹2,000–₹5,000/day", transport: "₹8,000–₹15,000/day (private SUV)", activities: "₹20,000–₹40,000",
        tips: ["Stay at The Grand Dragon Ladakh", "Helicopter Leh to Pangong — 20 min vs 5 hrs", "Private guided motorcycle with support van", "Zanskar Gorge kayaking — extreme adventure", "Helicopter to Siachen base camp experience"],
        itinerary: [
          { day: "Day 1-2", plan: ["Private transfer, luxury hotel", "Private monastery tours", "Stargazing with telescope"] },
          { day: "Day 3", plan: ["Helicopter to Nubra Valley", "Private camel safari", "Luxury desert camp"] },
          { day: "Day 4", plan: ["Helicopter Pangong sunrise", "Private boat on lake", "Luxury tent night"] },
          { day: "Day 5-6", plan: ["Private Zanskar gorge expedition", "Rafting with safety team", "Spa & departure"] },
        ],
      },
    },
  },

  somnath: {
    name: "Somnath",
    tagline: "First of the Twelve Jyotirlingas",
    description: "Somnath is Gujarat's most sacred city — the eternal Somnath temple rebuilt 17 times stands as a symbol of India's undying faith, beside the Arabian Sea.",
    bestTime: "October – February",
    famousFood: ["Undhiyu", "Dhokla", "Gujarati Thali", "Fafda Jalebi", "Khandvi"],
    highlights: ["Somnath Temple", "Triveni Sangam", "Bhalka Tirth", "Gita Mandir", "Prabhas Patan Museum"],
    icon: <Sun size={18} />,
    accentColor: "#fbbf24",
    photos: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Somnath_temple_Gujarat.jpg/1280px-Somnath_temple_Gujarat.jpg", caption: "Somnath Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Somnath_temple_sea_view.jpg/1280px-Somnath_temple_sea_view.jpg", caption: "Temple by Arabian Sea" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Triveni_Sangam_Somnath.jpg/1280px-Triveni_Sangam_Somnath.jpg", caption: "Triveni Sangam" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Bhalka_tirth_Somnath.jpg/800px-Bhalka_tirth_Somnath.jpg", caption: "Bhalka Tirth" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Gita_mandir_Somnath.jpg/800px-Gita_mandir_Somnath.jpg", caption: "Gita Mandir" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Prabhas_Patan_museum.jpg/1280px-Prabhas_Patan_museum.jpg", caption: "Prabhas Patan Museum" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Diu_fort_Gujarat.jpg/1280px-Diu_fort_Gujarat.jpg", caption: "Diu Fort (Nearby)" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Veraval_fishing_port.jpg/1280px-Veraval_fishing_port.jpg", caption: "Veraval Port" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dwarka_temple_Gujarat.jpg/1280px-Dwarka_temple_Gujarat.jpg", caption: "Dwarka Temple (Nearby)" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Somnath_evening_aarti.jpg/800px-Somnath_evening_aarti.jpg", caption: "Evening Aarti" },
    ],
    budget: {
      cheap: {
        total: "₹3,000 – ₹6,000", stay: "₹300–₹600/night (dharamshalas)", food: "₹80–₹180/day (Gujarati thali)", transport: "₹100–₹300 (auto/local bus)", activities: "₹100–₹300 total",
        tips: ["Dharamshalas near temple are cheapest & convenient", "Gujarati thali meals ₹80–₹150 unlimited", "Somnath temple entry is free", "Evening light & sound show ₹100 — must watch", "Auto covers all temples ₹200 for half day"],
        itinerary: [
          { day: "Day 1", plan: ["Arrive, dharamshala check-in", "Somnath Temple darshan (free)", "Triveni Sangam walk"] },
          { day: "Day 2", plan: ["5am Mangala aarti", "Bhalka Tirth", "Gita Mandir", "Light & sound show ₹100"] },
          { day: "Day 3", plan: ["Prabhas Patan Museum ₹20", "Veraval beach visit", "Depart"] },
        ],
      },
      medium: {
        total: "₹8,000 – ₹15,000", stay: "₹1,500–₹3,000/night (hotels)", food: "₹300–₹700/day", transport: "₹500–₹1,000/day (cab)", activities: "₹500–₹1,500",
        tips: ["Book hotel with sea view — worth extra ₹500", "Hire cab for Diu Island day trip ₹1,200", "Porbandar (Gandhi birthplace) day trip 100km", "Dwarka combine trip — 240km away", "Private priest for abhishek puja ₹500"],
        itinerary: [
          { day: "Day 1", plan: ["Hotel check-in", "Somnath Temple full darshan", "Light & sound show ₹100"] },
          { day: "Day 2", plan: ["Bhalka Tirth + Gita Mandir", "Diu Island day trip ₹1,200 cab", "Portuguese fort"] },
          { day: "Day 3", plan: ["Dwarka temple visit (cab ₹2,000)", "Beyt Dwarka island", "Return & depart"] },
        ],
      },
      expensive: {
        total: "₹20,000 – ₹45,000", stay: "₹4,000–₹10,000/night (luxury hotels)", food: "₹1,000–₹3,000/day", transport: "₹2,500–₹5,000/day", activities: "₹5,000–₹12,000",
        tips: ["Stay at Somnath Trust premium or Lords Inn", "Char Dham Gujarat circuit package", "Private chartered boat at Triveni Sangam", "Helicopter from Rajkot to Somnath", "Cruise from Diu to Somnath (seasonal)"],
        itinerary: [
          { day: "Day 1", plan: ["Flight Ahmedabad, private transfer", "Luxury hotel sea view", "VIP temple darshan"] },
          { day: "Day 2", plan: ["Private puja & abhishek at Somnath", "Diu luxury day trip", "Sunset cruise"] },
          { day: "Day 3", plan: ["Dwarka Dwarkadhish private tour", "Beyt Dwarka boat", "Fine dining"] },
          { day: "Day 4", plan: ["Porbandar Gandhi Ashram", "Gir Lions safari (180km)", "Depart"] },
        ],
      },
    },
  },
};

const budgetConfig = {
  cheap:     { label: "Budget",   emoji: "🎒", color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)",  desc: "Backpacker-friendly" },
  medium:    { label: "Standard", emoji: "✈️", color: "#fbbf24", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.25)",   desc: "Comfortable travel"  },
  expensive: { label: "Luxury",   emoji: "👑", color: "#f472b6", bg: "rgba(244,114,182,0.08)",  border: "rgba(244,114,182,0.25)",  desc: "Premium experience"  },
};

function PhotoGallery({ photos, cityName, accentColor, onClose }: { photos: { url: string; caption: string }[]; cityName: string; accentColor: string; onClose: () => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", overflowY: "auto" }}
      onClick={onClose}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px" }} onClick={e => e.stopPropagation()}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: 0 }}>{cityName}</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4 }}>{photos.length} HD Photos</p>
          </div>
          <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
            <X size={18} />
          </button>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {photos.map((photo, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)}
              style={{ position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", cursor: "zoom-in", background: "#111" }}>
              <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${cityName}${i}/600/450`; }} />
              <motion.div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`, opacity: hovered === i ? 1 : 0, transition: "opacity 0.3s" }} />
              <motion.p style={{ position: "absolute", bottom: 10, left: 12, right: 12, color: "#fff", fontSize: 12, fontWeight: 600, opacity: hovered === i ? 1 : 0, transition: "opacity 0.3s" }}>
                {photo.caption}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationPage({ params }: { params: Promise<{ place: string }> }) {
  const [cityKey, setCityKey] = useState<string>("");
  const [budget, setBudget] = useState<BudgetTier>("medium");
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    const key = window.location.pathname.split("/").pop()?.toLowerCase() ?? "";
    setCityKey(key);
  }, []);

  const city = cityData[cityKey];
  const bd = city?.budget[budget];
  const cfg = budgetConfig[budget];

  if (!cityKey) return null;

  if (!city) {
    return (
      <div style={{ minHeight: "100vh", background: "#070709", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 60 }}>🗺️</p>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900 }}>City not found</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Available: {Object.keys(cityData).join(", ")}</p>
      </div>
    );
  }

  const stagger = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 + i * 0.08, duration: 0.5 } });

  return (
    <div style={{ minHeight: "100vh", background: "#070709", color: "#fff", fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${city.accentColor}60; border-radius: 2px; }
        @keyframes pulse { from { opacity: 0.5; transform: scale(1); } to { opacity: 0.9; transform: scale(1.08); } }
      `}</style>

      {/* HERO */}
      <div style={{ position: "relative", minHeight: 400, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${city.accentColor}25 0%, transparent 70%)`, animation: "pulse 4s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${city.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${city.accentColor} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "48px 32px 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
          {/* Left content */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: city.accentColor, boxShadow: `0 0 12px ${city.accentColor}` }} />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>India · Travel Guide</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(56px, 9vw, 100px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 16, background: `linear-gradient(135deg, #fff 30%, ${city.accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {city.name}
            </motion.h1>

            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              style={{ color: city.accentColor, fontSize: 17, fontWeight: 600, marginBottom: 16, letterSpacing: "0.01em" }}>
              {city.tagline}
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75, maxWidth: 480 }}>
              {city.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
              {[
                { icon: <Clock size={12} />, label: "Best Time", val: city.bestTime },
                { icon: <MapPin size={12} />, label: "Highlights", val: `${city.highlights.length} must-see` },
                { icon: <Utensils size={12} />, label: "Signature Dish", val: city.famousFood[0] },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ color: city.accentColor, opacity: 0.7 }}>{item.icon}</div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em" }}>{item.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, marginTop: 1 }}>{item.val}</div>
                  </div>
                  {i < 2 && <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.07)", marginLeft: 8 }} />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo thumbnails */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
            {city.photos.slice(0, 3).map((photo, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, x: -4 }}
                style={{ width: 88, height: 62, borderRadius: 12, overflow: "hidden", cursor: "pointer", position: "relative", flexShrink: 0 }}
                onClick={() => setShowPhotos(true)}>
                <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${city.name}${i}/200/150`; }} />
                {i === 2 && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
                    <Camera size={14} style={{ color: city.accentColor }} />
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, marginTop: 2 }}>+{city.photos.length - 2}</span>
                  </div>
                )}
              </motion.div>
            ))}
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowPhotos(true)}
              style={{ fontSize: 11, fontWeight: 700, color: city.accentColor, background: "none", border: "none", cursor: "pointer", textAlign: "center", marginTop: 2 }}>
              View all
            </motion.button>
          </motion.div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #070709)" }} />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Budget Selector */}
        <motion.div {...stagger(0)} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Compass size={12} style={{ color: "rgba(255,255,255,0.25)" }} />
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600 }}>Choose Your Travel Style</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {(["cheap", "medium", "expensive"] as BudgetTier[]).map((tier) => {
              const c = budgetConfig[tier];
              const isActive = budget === tier;
              return (
                <motion.button key={tier} onClick={() => { setBudget(tier); setActiveDay(null); }}
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: "14px 16px", borderRadius: 16, border: `1px solid ${isActive ? c.border : "rgba(255,255,255,0.07)"}`, background: isActive ? c.bg : "rgba(255,255,255,0.025)", cursor: "pointer", textAlign: "left", outline: "none", position: "relative", overflow: "hidden", transition: "all 0.25s" }}>
                  {isActive && <motion.div layoutId="activeBudget" style={{ position: "absolute", inset: 0, background: c.bg, borderRadius: 16 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{c.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? c.color : "rgba(255,255,255,0.5)" }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{c.desc}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Budget Card */}
        <AnimatePresence mode="wait">
          <motion.div key={budget} initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.98 }} transition={{ duration: 0.3 }}
            style={{ borderRadius: 24, border: `1px solid ${cfg.border}`, background: cfg.bg, padding: "28px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: cfg.color, opacity: 0.04, filter: "blur(50px)" }} />

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>Total Estimated Budget</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: cfg.color, lineHeight: 1 }}>{bd.total}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, border: `1px solid ${cfg.border}`, background: "rgba(0,0,0,0.2)" }}>
                <span>{cfg.emoji}</span>
                <span style={{ color: cfg.color, fontSize: 12, fontWeight: 700 }}>{cfg.label}</span>
              </div>
            </div>

            {/* Cost Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 24 }}>
              {[{ icon: "🏨", label: "Stay", val: bd.stay }, { icon: "🍽️", label: "Food", val: bd.food }, { icon: "🚗", label: "Transport", val: bd.transport }, { icon: "🎯", label: "Activities", val: bd.activities }].map((item) => (
                <div key={item.label} style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 13 }}>{item.icon}</span>
                    <span style={{ color: cfg.color, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, lineHeight: 1.5 }}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${cfg.color}30, transparent)`, marginBottom: 20 }} />

            {/* Tips */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={10} /> Money-Saving Tips
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {bd.tips.map((tip, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: cfg.color, fontSize: 10, fontWeight: 800 }}>{i + 1}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6 }}>{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${cfg.color}30, transparent)`, marginBottom: 20 }} />

            {/* Itinerary */}
            <div>
              <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <Navigation size={10} /> Day-by-Day Itinerary
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {bd.itinerary.map((day, i) => (
                  <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${activeDay === i ? cfg.border : "rgba(255,255,255,0.05)"}`, background: activeDay === i ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)", transition: "all 0.2s" }}>
                    <button onClick={() => setActiveDay(activeDay === i ? null : i)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", cursor: "pointer", background: "none", border: "none", outline: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: cfg.color, fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                        </div>
                        <span style={{ color: activeDay === i ? "#fff" : "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 600 }}>{day.day}</span>
                      </div>
                      <motion.div animate={{ rotate: activeDay === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeDay === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                          <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                            {day.plan.map((step, j) => (
                              <motion.div key={j} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.06 }}
                                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <div style={{ width: 18, height: 18, borderRadius: 5, background: `${cfg.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                  <ArrowRight size={9} style={{ color: cfg.color }} />
                                </div>
                                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6 }}>{step}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Highlights */}
        <motion.div {...stagger(2)} style={{ marginBottom: 16 }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Star size={10} /> Top Highlights
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {city.highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }} whileHover={{ y: -2, scale: 1.02 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", cursor: "default" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: city.accentColor, boxShadow: `0 0 6px ${city.accentColor}80` }} />
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 500 }}>{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Food */}
        <motion.div {...stagger(3)}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Utensils size={10} /> Must-Try Food
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {city.famousFood.map((food, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} whileHover={{ y: -3, scale: 1.02 }}
                style={{ padding: "14px 16px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 24 }}>🍽️</div>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>{food}</div>
                  <div style={{ color: city.accentColor, fontSize: 11, marginTop: 2, opacity: 0.7 }}>Local specialty</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {showPhotos && <PhotoGallery photos={city.photos} cityName={city.name} accentColor={city.accentColor} onClose={() => setShowPhotos(false)} />}
      </AnimatePresence>
    </div>
  );
}