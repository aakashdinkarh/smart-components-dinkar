import React from "react";

import {
  Button,
  toast,
  type OptionsProps,
  type IButton,
} from "smart-components-dinkar";
import { AppCodeWrapper } from "../../common/AppCodeWrapper";
import { StickyHeader } from "../../common/StickyHeader";
import { codeHighlightClassHTML } from "../../constants";
import { useHighlightCode } from "../../hooks/useHighlightCode";
import { HelmetComponent } from "../HelmetComponent";

import usageData from "./usage.json";

interface usageDataItem {
  id: number;
  title: string;
  buttonThemeType: IButton["themeType"];
  toastMessage: string;
  placement: OptionsProps["placement"];
}

export function ToastPage() {
  const { isCodeHighlighted } = useHighlightCode();

  return (
    <main>
      <HelmetComponent />

      <StickyHeader heading="Toast" withThemeSelector />

      {(usageData as usageDataItem[]).map((data) => {
        const { id, title, toastMessage, buttonThemeType, placement } = data;

        return (
          <React.Fragment key={id}>
            <Button
              className="my-1"
              themeType={buttonThemeType}
              outline
              onClick={() => {
                toast(toastMessage, { placement });
              }}
            >
              {title}
            </Button>

            <div className="mb-4">
              <AppCodeWrapper
                isCodeHighlighted={Boolean(isCodeHighlighted)}
                languageClass={codeHighlightClassHTML}
              >
                {`<button
	onClick={() => {
		toast(
			'${toastMessage}',
			{ placement: '${placement}' }
		);
	}}
>
	${title}
</button>`}
              </AppCodeWrapper>
            </div>
          </React.Fragment>
        );
      })}
    </main>
  );
}
