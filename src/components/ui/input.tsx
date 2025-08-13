import { Input } from "@base-ui-components/react";
import React from "react";
import { cn } from "../../utils/ui/utils";
import styles from "./input.module.css";

interface UIInputProps extends Input.Props {
	className?: string;
}

const UIInput: React.ForwardRefExoticComponent<
	UIInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = React.forwardRef<HTMLInputElement, UIInputProps>(
	(
		{ className, ...props }: UIInputProps,
		ref: React.ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<Input ref={ref} className={cn(styles.Input, className)} {...props} />
		);
	},
);

UIInput.displayName = "UIInput";

export default UIInput;
