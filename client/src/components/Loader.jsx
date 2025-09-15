import {
  LoaderOne,
  LoaderTwo,
  LoaderThree,
  LoaderFour,
  LoaderFive,
} from "@/components/ui/loader";

export default function Loader({
  fullscreen = true,
  variant = "one",
  className = "",
}) {
  const variants = {
    one: LoaderOne,
    two: LoaderTwo,
    three: LoaderThree,
    four: LoaderFour,
    five: LoaderFive,
  };
  const Comp = variants[variant] || LoaderOne;

  return (
    <div
      className={
        (fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/40 backdrop-blur-sm"
          : "w-full h-full flex items-center justify-center") +
        (className ? ` ${className}` : "")
      }
    >
      <Comp />
    </div>
  );
}
