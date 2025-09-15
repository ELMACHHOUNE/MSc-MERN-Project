import { Boxes } from "../components/ui/background-boxes";

// Full-screen background wrapper
export default function BackgroundBoxes({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Fixed full-screen decorative background layer (allow hover) */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        {/* Mask / radial fade */}
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,0.65),transparent_70%)]" />
        <Boxes />
      </div>

      {/* Foreground content above background */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
