import React, { useState } from "react";
import { Sparkles, Compass, Lightbulb, Zap, Heart } from "lucide-react";
import { motion } from "motion/react";
import profileImage from "../assets/images/image-1.png"; // adjust path

// Use the generated avatar image asset
import avatarImg from "../assets/images/avatar_meddhansh_1781239548487.jpg";

interface InteractivePersonalityProps {
  activeMode: "Sensible" | "Passionate" | "Balanced";
  onChangeMode: (mode: "Sensible" | "Passionate" | "Balanced") => void;
}

export default function InteractivePersonality({
  activeMode,
  onChangeMode,
}: InteractivePersonalityProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Degrees of rotation or styling values based on the personality mode
  const getStylingState = () => {
    switch (activeMode) {
      case "Sensible":
        return {
          arcRotate: -135,
          color: "text-orange-500",
          borderColor: "border-orange-500",
          title: "The Sensible Analyst",
          tagline: "STRATEGIC • SCHOLASTIC • METHODICAL",
          description:
            "Driven by systems, structure, and literature. Under this lens, Meddhansh crafts deep academic research documents, structures bulletproof information architectures for presentations, and cracks complex whodunit murder mysteries.",
          quote: '"Logic is the beginning of wisdom, not the end."',
        };
      case "Passionate":
        return {
          arcRotate: 45,
          color: "text-blue-750",
          borderColor: "border-blue-750",
          title: "The Passionate Creator",
          tagline: "CINEMATIC • EXPLOSIVE • BOLD",
          description:
            "Fueled by raw energy, visual storytelling, and athletic intensity. Under this lens, Meddhansh shoots and edits high-tempo cinematic videos, smashes aggressive shots in squash/badminton, and sinks into imaginative fiction.",
          quote: '"Do everything with your whole heart or not at all."',
        };
      default: // Balanced
        return {
          arcRotate: -45,
          color: "text-indigo-600",
          borderColor: "border-indigo-600",
          title: "The Striking Balance",
          tagline: "SYNTHESIS OF LOGIC & INTENSITY",
          description:
            "Meddhansh’s sweet spot. Thinking strategically before acting, but executing with absolute, uncompromising boldness. Merging deep rigorous research with attractive, breathtaking design layouts.",
          quote: '"First understand the science, then paint the masterpiece."',
        };
    }
  };

  const style = getStylingState();

  return (
    <div
      id="interactive-personality-block"
      className="flex flex-col items-center"
    >
      {/* Interactive Avatar Wheel */}
      <div className="relative w-76 h-76 flex items-center justify-center select-none">
        {/* Soft Background Lavender Glow */}
        <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-2xl"></div>

        {/* Outer Circular Ring */}
        <div className="absolute inset-0 rounded-full border border-orange-500/20"></div>

        {/* Dynamic Blue Crescent Arc (grows/moves based on personality mode) */}
        <motion.div
          animate={{ rotate: style.arcRotate }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="absolute inset-[2px] rounded-full border-4 border-transparent border-r-blue-700 pointer-events-none"
        ></motion.div>

        {/* Inner Avatar Frame */}
        <div className="relative w-64 h-64 rounded-full border border-slate-300 shadow-inner overflow-hidden">
          <img
            src={profileImage}
            alt="Shubham"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top-Right Badge: "PASSIONATE" */}
        <button
          onClick={() => onChangeMode("Passionate")}
          onMouseEnter={() => setIsHovered("Passionate")}
          onMouseLeave={() => setIsHovered(null)}
          className={`absolute top-4 right-1 px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-mono text-[10px] font-bold tracking-widest rounded uppercase cursor-pointer shadow-lg transition-all duration-300 z-10 ${
            activeMode === "Passionate"
              ? "scale-110 ring-2 ring-white ring-offset-2"
              : "opacity-70 scale-95"
          }`}
        >
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-orange-400" />
            Passionate
          </span>
        </button>

        {/* Bottom-Left Badge: "SENSIBLE" */}
        <button
          onClick={() => onChangeMode("Sensible")}
          onMouseEnter={() => setIsHovered("Sensible")}
          onMouseLeave={() => setIsHovered(null)}
          className={`absolute bottom-4 left-1 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-mono text-[10px] font-bold tracking-widest rounded uppercase cursor-pointer shadow-lg transition-all duration-300 z-10 ${
            activeMode === "Sensible"
              ? "scale-110 ring-2 ring-white ring-offset-2"
              : "opacity-70 scale-95"
          }`}
        >
          <span className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-white" />
            Sensible
          </span>
        </button>

        {/* Underlay Click Guide Indicator */}
        <div className="absolute -bottom-2 text-[10px] font-mono text-slate-400 tracking-wider text-center uppercase">
          Click badges to shift toggle lens
        </div>
      </div>

      {/* Control Switcher Bar */}
      <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 mt-8 mb-4 max-w-xs w-full shadow-inner">
        {(["Sensible", "Balanced", "Passionate"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => onChangeMode(mode)}
            className={`flex-1 py-1.5 text-center font-mono text-[10px] font-bold tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
              activeMode === mode
                ? mode === "Sensible"
                  ? "bg-orange-500 text-white shadow"
                  : mode === "Passionate"
                    ? "bg-blue-700 text-white shadow"
                    : "bg-indigo-600 text-white shadow"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Dynamic Profile Breakdown Details card */}
      <div className="w-full max-w-sm mt-3 bg-white/70 backdrop-blur-sm border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
        <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full font-bold">
          {style.tagline}
        </span>
        <h4 className="font-sans font-bold text-lg text-slate-800 mt-2 flex items-center justify-center gap-2">
          {activeMode === "Sensible" && (
            <Compass className="w-4 h-4 text-orange-500" />
          )}
          {activeMode === "Passionate" && (
            <Zap className="w-4 h-4 text-blue-700" />
          )}
          {activeMode === "Balanced" && (
            <Lightbulb className="w-4 h-4 text-indigo-600" />
          )}
          {style.title}
        </h4>
        <p className="text-slate-600 text-xs font-sans mt-2.5 leading-relaxed text-justify px-2">
          {style.description}
        </p>
        <div className="border-t border-slate-100 pt-3 mt-3">
          <p className="text-[11px] italic font-mono text-indigo-700 font-medium">
            {style.quote}
          </p>
        </div>
      </div>
    </div>
  );
}
