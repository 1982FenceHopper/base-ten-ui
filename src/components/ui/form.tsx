import { Form } from "@base-ui-components/react";
import { cn } from "../../utils/ui/utils";
import styles from "./form.module.css";

interface UIFormProps extends Form.Props {
  ref?: React.Ref<HTMLFormElement>;
}

const UIForm: React.FC<UIFormProps> = ({
  children,
  className,
  ref,
  ...props
}: UIFormProps) => {
  return (
    <Form ref={ref} className={cn(styles.Form, className)} {...props}>
      {children}
    </Form>
  );
};

UIForm.displayName = "UIForm";

export default UIForm;
