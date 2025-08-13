import { ScrollArea } from "@base-ui-components/react";
import { cn } from "../../utils/ui/utils";
import styles from "./scrollarea.module.css";

interface UIScrollAreaProps extends ScrollArea.Scrollbar.Props {
  children: React.ReactNode;
  className?: string;
}

const UIScrollArea: React.FC<UIScrollAreaProps> = ({
  children,
  className,
  ...props
}: UIScrollAreaProps) => {
  return (
    <ScrollArea.Root className={cn(styles.ScrollArea, className)}>
      <ScrollArea.Viewport className={styles.Viewport}>
        <ScrollArea.Content className={styles.Content}>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar} {...props}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

UIScrollArea.displayName = "UIScrollArea";

export default UIScrollArea;
