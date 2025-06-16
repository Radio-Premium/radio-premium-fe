import Button from "@/shared/components/ui/Button";

const toggleSize = {
  s: {
    buttonSize: "h-6 w-12",
    thumbSize: "h-4 w-4",
    activeTranslate: "translate-x-6",
  },
  m: {
    buttonSize: "h-8 w-15",
    thumbSize: "h-6 w-6",
    activeTranslate: "translate-x-7",
  },
};

const ToggleButton = ({ size = "m", checked, onToggle, disabled = false }) => {
  const { buttonSize, thumbSize, activeTranslate } = toggleSize[size];

  return (
    <Button
      disabled={disabled}
      className={`relative cursor-pointer rounded-full transition-colors duration-200 ${
        disabled
          ? "cursor-not-allowed bg-neutral-200"
          : checked
            ? "bg-black"
            : "bg-neutral-300"
      } ${buttonSize}`}
      onClick={onToggle}
    >
      <div
        className={`absolute top-1 left-1 rounded-full bg-white duration-400 ${
          checked ? activeTranslate : "translate-x-0"
        } ${thumbSize}`}
      />
    </Button>
  );
};

export default ToggleButton;
