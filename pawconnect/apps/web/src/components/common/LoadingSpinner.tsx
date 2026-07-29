import styles from "@/styles/common/LoadingSpiner.module.css";

type LoadingSpinnerSize = "xlarge" | "large" | "medium" | "small";

interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  label?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = "large",
  label,
  className,
}: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`${styles.spinner} ${className ?? ""} ${styles[size]}`}
    />
  );
}
