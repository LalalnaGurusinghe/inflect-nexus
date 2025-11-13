import { useScrollProgress } from "@/hooks/useScrollAnimations";

export const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
  );
};
