import { Toast } from "@base-ui-components/react";
import { XIcon } from "lucide-react";
import type React from "react";
import styles from "./toast.module.css";

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className={styles.Toast}>
      <Toast.Title className={styles.Title} />
      <Toast.Description className={styles.Description} />
      <Toast.Close className={styles.Close} aria-label="close">
        <XIcon className="h-4 w-4" />
      </Toast.Close>
    </Toast.Root>
  ));
}

const UIToastProvider: React.FC<Toast.Provider.Props> = ({
  toastManager,
  children,
  ...props
}) => {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className={styles.Viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
};

UIToastProvider.displayName = "UIToastProvider";

const useToastManager = Toast.useToastManager;

export { UIToastProvider, useToastManager };
