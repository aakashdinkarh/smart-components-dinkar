import React, { memo } from "react";
import type { JSX } from "react";

import { Switch } from "@components/Switch";

import styles from "./loader.module.css";

export type loaderVariant = "spin" | "lines" | "dots-bounce" | "dots-fade";

const defaultSizes = {
  spin: "50px",
  lines: "40px",
  "dots-bounce": "1rem",
  "dots-fade": "1rem",
};

export interface LoaderProps {
  variant: loaderVariant;
  color?: string;
  size?: string;
}
/**
 * A customizable loader component that displays different loading animations.
 * @param {LoaderProps} props - The props of the component.
 * @param {string} [props.variant='spin'] - The variant of the loader animation.
 * @param {string} [props.color='#3498db'] - The color of the loader.
 * @param {string} [props.size=''] - The size of the loader.
 * @returns {JSX.Element} The rendered loader component.
 * @example
 * // Usage example:
 * <Loader variant="spin" color="#ff5733" size="50px" />
 * <Loader variant="lines" color="#ff5733" size="40px" />
 * <Loader variant="dots-bounce" color="#ff5733" size="1rem" />
 * <Loader variant="dots-fade" color="#ff5733" size="1rem" />
 */
export const Loader = memo(function Loader({
  variant = "spin",
  color = "#3498db",
  size = "",
}: LoaderProps): JSX.Element {
  const cssVariable = variant === "lines" ? "--loader-height" : "--loader-size";
  const defaultSize = size || defaultSizes[variant] || "1rem";

  return (
    <div
      className={styles[`loader-${variant}`]}
      style={{
        [cssVariable]: defaultSize,
        borderTopColor: color,
      }}
    >
      <Switch>
        <Switch.Case condition={variant === "lines"}>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={styles.line}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  backgroundColor: color,
                }}
              />
            ))}
        </Switch.Case>

        <Switch.Case condition={variant === "dots-bounce"}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={styles.bounce}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  backgroundColor: color,
                }}
              />
            ))}
        </Switch.Case>

        <Switch.Case condition={variant === "dots-fade"}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={styles.dot}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  backgroundColor: color,
                }}
              />
            ))}
        </Switch.Case>
      </Switch>
    </div>
  );
});
