import type { PropsWithChildren } from "react";
import React, { memo, useCallback } from "react";

import { CopyIcon } from "@icons/index";
import { copyToClipboard } from "@utils/copyToClipboard";
import { getCombinedClass } from "@utils/getCombinedClass";

import styles from "./styles.module.css";

interface CodeWrapperProps extends PropsWithChildren {
  isCodeHighlighted: boolean;
  languageClass?: string;
  onCopy?: () => void;
  onCopyFail?: (errorMsg: string) => void;
}

/**
 * CodeWrapper component for displaying and highlighting code snippets.
 * @component
 * @param {CodeWrapperProps} props - The props for the CodeWrapper component.
 * @param {boolean} props.isCodeHighlighted - Indicates whether code is highlighted with hljs or not.
 * @param {string} [props.languageClass=''] - Additional CSS class to apply to the code wrapper 
	based on the programming language.
 * @param {function} [props.onCopy] - Callback function to be called when the code is copied.
 * @param {function} [props.onCopyFail] - Callback function to be called when the code is not copied.
 * @returns {JSX.Element} The rendered CodeWrapper component.
 * @example
 * //usage example
	<CodeWrapper
		isCodeHighlighted={Boolean(isCodeHighlighted)}
		languageClass="language-html"
	>
		{`<Loader variant="dots-bounce" />`}
	</CodeWrapper>
 */
export const CodeWrapper = memo(function CodeWrapper({
  children,
  isCodeHighlighted,
  onCopy,
  onCopyFail,
  languageClass = "",
}: CodeWrapperProps) {
  const handleCopy = useCallback(() => {
    void (async function () {
      const res = await copyToClipboard(children as string);
      if (res.success && typeof onCopy === "function") {
        onCopy();
        return;
      }
      if (!res.success && typeof onCopyFail === "function") {
        onCopyFail(res.error);
      }
    })();
  }, [children, onCopy, onCopyFail]);

  return (
    <div
      className={getCombinedClass(
        styles["code-container"],
        "__scd_code-container",
        {
          [styles["code-highlighted"]]: isCodeHighlighted,
        }
      )}
    >
      <CopyIcon
        width={20}
        height={20}
        onClick={handleCopy}
        className={styles["copy-button"]}
      />
      <pre
        className={getCombinedClass({
          hljs: isCodeHighlighted,
        })}
        style={{ paddingRight: 28 }}
      >
        <code className={languageClass}>{children}</code>
      </pre>
    </div>
  );
});
