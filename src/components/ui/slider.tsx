import { Slider } from "@base-ui-components/react";
import React from "react";
import { cn } from "../../utils/ui/utils";
import styles from "./slider.module.css";

function useForwardedRef<T>(
  forwardedRef: React.ForwardedRef<T>,
): React.RefObject<T> {
  const innerRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  }, [forwardedRef]);

  return innerRef as React.RefObject<T>;
}

interface UISliderProps {
  value?: number | number[];
  onValueChange?: (
    value: number | number[],
    event: Event,
    activeThumbIndex: number,
  ) => void;
  step: number;
  min: number;
  max: number;
  defaultValue: number;
  className?: string;
  thumbClassName?: string;
  thumbRender?:
    | ((
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        inputProps: React.ComponentPropsWithRef<"input">,
        state: Slider.Thumb.State,
      ) => React.ReactElement)
    | (React.ReactElement & {
        ref: React.Ref<Element>;
      });
}

type CombinedUISliderProps = UISliderProps &
  Slider.Root.Props &
  React.HTMLAttributes<HTMLDivElement>;

const UISlider: React.ForwardRefExoticComponent<
  CombinedUISliderProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, CombinedUISliderProps>(
  (
    {
      value,
      onValueChange,
      step,
      min,
      max,
      defaultValue,
      className,
      thumbClassName,
      thumbRender,
    }: CombinedUISliderProps,
    ref: React.ForwardedRef<HTMLDivElement | null>,
  ) => {
    const innerRef = useForwardedRef(ref);

    return (
      <Slider.Root
        value={value}
        onValueChange={onValueChange}
        step={step}
        min={min}
        max={max}
        className={className}
        defaultValue={defaultValue}
        ref={innerRef as React.RefObject<HTMLDivElement>}
      >
        <Slider.Control className={styles.Control}>
          <Slider.Track className={styles.Track}>
            <Slider.Indicator className={styles.Indicator} />
            <Slider.Thumb
              className={cn(styles.Thumb, thumbClassName)}
              render={thumbRender}
            />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    );
  },
);

UISlider.displayName = "UISlider";

export default UISlider;
