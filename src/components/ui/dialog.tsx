import { Dialog } from "@base-ui-components/react";
import type React from "react";
import { cn } from "../../utils/ui/utils";
import UIButton from "./button";
import styles from "./dialog.module.css";

type AsyncCompatibleMouseEventHandler<T extends HTMLElement> = (
  event: React.MouseEvent<T>,
) => void | Promise<void>;

interface UIRootDialogProps {
  className?: string;
  closeClassName?: string;
  closeText?: string;
  children: React.ReactNode;
  description?: string;
  confirm?: {
    text: string;
    action: AsyncCompatibleMouseEventHandler<HTMLButtonElement>;
    type: "normal" | "ghost" | "destructive";
    className?: string;
    additional_attributes?: Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "onClick" | "intent"
    >;
  };
}

interface UIBasicDialogProps extends UIRootDialogProps {
  trigger: React.ReactElement<
    Record<string, unknown>,
    // biome-ignore lint/suspicious/noExplicitAny: Exact type as provided by BaseUI Dialog.Trigger.render prop
    string | React.JSXElementConstructor<any>
  >;
}

interface UIControlledDialogProps extends UIRootDialogProps {
  open: boolean;
  onOpenChange: (
    open: boolean,
    event: Event | undefined,
    reason: Dialog.Root.OpenChangeReason | undefined,
  ) => void;
}

const UIBasicDialog: React.FC<UIBasicDialogProps> = ({
  trigger,
  children,
  description,
  className,
  closeClassName,
  closeText = "Close",
  confirm,
}: UIBasicDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={cn(styles.Popup, className)}>
          <Dialog.Title className={styles.Title}>{children}</Dialog.Title>
          {description && (
            <Dialog.Description className={styles.Description}>
              {description}
            </Dialog.Description>
          )}
          <div className={styles.Actions}>
            <Dialog.Close
              render={
                <UIButton rounded intent={"ghost"} className={closeClassName}>
                  {closeText}
                </UIButton>
              }
            />
            {confirm && (
              <UIButton
                rounded
                className={confirm.className}
                intent={confirm.type}
                onClick={confirm.action}
                {...confirm.additional_attributes}
              >
                {confirm.text}
              </UIButton>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const UIControlledDialog: React.FC<UIControlledDialogProps> = ({
  open,
  onOpenChange,
  children,
  description,
  className,
  closeClassName,
  closeText = "Close",
  confirm,
}: UIControlledDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={cn(styles.Popup, className)}>
          <Dialog.Title className={styles.Title}>{children}</Dialog.Title>
          {description && (
            <Dialog.Description className={styles.Description}>
              {description}
            </Dialog.Description>
          )}
          <div className={styles.Actions}>
            <Dialog.Close
              render={
                <UIButton rounded intent={"ghost"} className={closeClassName}>
                  {closeText}
                </UIButton>
              }
            />
            {confirm && (
              <UIButton
                rounded
                className={confirm.className}
                intent={confirm.type}
                onClick={confirm.action}
                {...confirm.additional_attributes}
              >
                {confirm.text}
              </UIButton>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

UIBasicDialog.displayName = "UIBasicDialog";
UIControlledDialog.displayName = "UIControlledDialog";

export { UIBasicDialog, UIControlledDialog };
