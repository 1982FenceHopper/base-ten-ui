import { Field } from "@base-ui-components/react";
import React from "react";
import { cn } from "../../utils/ui/utils";
import styles from "./field.module.css";

interface UIFieldProps {
	label: string;
	error?: string;
	description?: string;
	match?: keyof ValidityState;
	className?: string;
	children?: React.ReactNode;
}

type CombinedUIFieldProps = UIFieldProps &
	Field.Root.Props &
	React.HTMLAttributes<HTMLDivElement>;

const UIField: React.ForwardRefExoticComponent<
	CombinedUIFieldProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, CombinedUIFieldProps>(
	(
		{
			className,
			children,
			label,
			error,
			description,
			match = "valueMissing",
			...props
		}: CombinedUIFieldProps,
		ref,
	) => {
		return (
			<Field.Root ref={ref} className={cn(styles.Field, className)} {...props}>
				<Field.Label className={styles.Label}>{label}</Field.Label>
				{children}

				<Field.Error className={styles.Error} match={match}>
					{error}
				</Field.Error>

				{description && (
					<Field.Description className={styles.Description}>
						{description}
					</Field.Description>
				)}
			</Field.Root>
		);
	},
);

UIField.displayName = "UIField";

export default UIField;
