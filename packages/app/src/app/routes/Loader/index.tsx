import React, { Fragment } from "react";

import { Loader, type LoaderProps } from "smart-components-dinkar";
import { AppCodeWrapper } from "../../common/AppCodeWrapper";
import { StickyHeader } from "../../common/StickyHeader";
import { codeHighlightClassHTML } from "../../constants";
import { useHighlightCode } from "../../hooks/useHighlightCode";
import { HelmetComponent } from "../HelmetComponent";

import usageData from "./usage.json";

const usageDataLength = usageData.length;

interface usageDataItem {
  id: number;
  title: string;
  variant: LoaderProps["variant"];
}

export function LoaderPage() {
  const { isCodeHighlighted } = useHighlightCode();

  return (
    <main>
      <HelmetComponent />

      <StickyHeader heading="Loader" withThemeSelector />

      {(usageData as usageDataItem[]).map((data, index) => {
        const { id, title, variant } = data;

        return (
          <Fragment key={id}>
            <h3>{title}</h3>
            <Loader variant={variant} />

            <div className="mt-2">
              <AppCodeWrapper
                isCodeHighlighted={Boolean(isCodeHighlighted)}
                languageClass={codeHighlightClassHTML}
              >
                {`<Loader variant="${variant}" />`}
              </AppCodeWrapper>
            </div>

            {usageDataLength - 1 !== index && <hr className="mt-2 mb-4" />}
          </Fragment>
        );
      })}
    </main>
  );
}
