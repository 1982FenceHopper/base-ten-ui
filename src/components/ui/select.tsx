import { Select } from "@base-ui-components/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";
import { cn } from "../../utils/ui/utils";
import styles from "./select.module.css";

interface UISelectProps {
  className?: string;
  itemizedList: { label: string; value: string | null }[];
  value: string | null;
  onValueChange: (value: string | null, event: Event | undefined) => void;
}

type CombinedUISelectProps = UISelectProps &
  Select.Trigger.Props &
  React.HTMLAttributes<HTMLDivElement>;

const UISelect: React.ForwardRefExoticComponent<
  CombinedUISelectProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, CombinedUISelectProps>(
  (
    {
      itemizedList,
      value,
      onValueChange,
      className,
      ...props
    }: CombinedUISelectProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Select.Root
        items={itemizedList}
        value={value}
        onValueChange={onValueChange}
      >
        <Select.Trigger
          ref={ref}
          className={cn(styles.Select, className)}
          {...props}
        >
          <Select.Value />
          <Select.Icon className={styles.SelectIcon}>
            <ChevronsUpDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className={styles.Positioner} sideOffset={8}>
            <Select.ScrollUpArrow className={styles.ScrollArrow} />
            <Select.Popup className={styles.Popup}>
              {itemizedList.map(({ label, value }) => (
                <Select.Item key={label} value={value} className={styles.Item}>
                  <Select.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon className={styles.ItemIndicatorIcon} />
                  </Select.ItemIndicator>
                  <Select.ItemText className={styles.ItemText}>
                    {label}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Popup>
            <Select.ScrollDownArrow className={styles.ScrollArrow} />
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    );
  },
);

UISelect.displayName = "UISelect";

export default UISelect;
