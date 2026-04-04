"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { createAnimation } from "@/components/ui/theme-animations";

const ThemeToggleButton = ({
  showLabel = false,
  variant = "circle-blur",
  start = "top-right",
  url,
}) => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const currentStyleElement = useRef(null);

  const handleThemeToggle = () => {
    if (isAnimating) return;

    if (variant === "gif" || variant === "circle" || variant === "circle-blur" || variant === "polygon") {
      setIsAnimating(true);

      if (currentStyleElement.current) {
        try {
          document.head.removeChild(currentStyleElement.current);
        } catch (e) {
          // no-op
        }
        currentStyleElement.current = null;
      }

      const animation = createAnimation(variant, start, url);
      const styleElement = document.createElement("style");
      styleElement.textContent = animation.css;
      styleElement.setAttribute("data-theme-animation", "true");
      document.head.appendChild(styleElement);
      currentStyleElement.current = styleElement;

      if (document.startViewTransition) {
        document
          .startViewTransition(() => {
            setTheme(theme === "dark" ? "light" : "dark");
          })
          .finished.then(() => {
            setTimeout(() => {
              if (currentStyleElement.current) {
                try {
                  document.head.removeChild(currentStyleElement.current);
                } catch (e) {
                  // no-op
                }
                currentStyleElement.current = null;
              }
              setIsAnimating(false);
            }, 50);
          })
          .catch(() => {
            setTimeout(() => {
              if (currentStyleElement.current) {
                try {
                  document.head.removeChild(currentStyleElement.current);
                } catch (e) {
                  // no-op
                }
                currentStyleElement.current = null;
              }
              setIsAnimating(false);
            }, 800);
          });
      } else {
        setTheme(theme === "dark" ? "light" : "dark");
        setTimeout(() => {
          if (currentStyleElement.current) {
            try {
              document.head.removeChild(currentStyleElement.current);
            } catch (e) {
              // no-op
            }
            currentStyleElement.current = null;
          }
          setIsAnimating(false);
        }, 600);
      }
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  useEffect(() => {
    return () => {
      if (currentStyleElement.current) {
        try {
          document.head.removeChild(currentStyleElement.current);
        } catch (e) {
          // no-op
        }
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={
          variant === "circle" ||
          variant === "circle-blur" ||
          variant === "polygon" ||
          variant === "gif"
            ? "outline"
            : variant
        }
        size="icon"
        onClick={handleThemeToggle}
        disabled={isAnimating}
        className="transition-all duration-150 hover:scale-105 rounded-md"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {showLabel && (
        <span className="text-sm font-medium">
          {theme === "dark" ? "Light" : "Dark"} Mode
        </span>
      )}
    </div>
  );
};

export default ThemeToggleButton;
