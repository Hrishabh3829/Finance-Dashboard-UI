import { useEffect, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAppState } from "@/lib/state";

const LOADER_MIN_MS = 650;

export function LoadingOverlay() {
  const navigation = useNavigation();
  const location = useLocation();
  const { role } = useAppState();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const id = setTimeout(() => setPulse(false), LOADER_MIN_MS);
    return () => clearTimeout(id);
  }, [location.pathname, role]);

  const isActive = navigation.state !== "idle" || pulse;

  return (
    <div
      className={
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur transition-opacity " +
        (isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
      }
      role="status"
      aria-live="polite"
    >
      <div className="w-48 h-48">
        <DotLottieReact
          src="https://lottie.host/794e1e01-f2c4-43f9-a3b7-e91a2d4f23e4/PdOxWPm083.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
