import React from 'react';

import { CodeWrapper } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassJS } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';

const StyledH2 = ({ children }) => {
	return <h2 style={{ marginBottom: '0.5rem' }} >{children}</h2>
}

export function HomePage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<>
			<header>
				<StickyHeader heading='Smart Components Dinkar' subtitle='Building from scratch!' withThemeSelector />
			</header>

			<section>
				<StyledH2>About</StyledH2>
				Welcome to <strong>DevDinkar CodeBook</strong> (smart-components-dinkar package)! This project
				contains a collection of smart components designed to ease your web application development by
				providing reusable and efficient solutions for common UI patterns. You can see the tutorials and
				components usage here from the left navbar for your different requirements.
			</section>

			<section>
				<StyledH2><span style={{ color: '#EC407A' }} >Note</span></StyledH2>
				For optimal performance and minimal import size, import components from their individual folders rather
				than from the package's common entry point. We are working on enabling tree-shaking, which will
				eventually allow you to import all components directly from the common entry point without sacrificing
				performance or increasing import size.

				<p>For example,</p>

				<div>
				Instead of this
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassJS}>
					{`import { Select } from 'smart-components-dinkar';`}
				</CodeWrapper>
				<br />
				Import like this
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassJS}>
					{`import { Select } from 'smart-components-dinkar/dist/components/Select';`}
				</CodeWrapper>
			</div>
			</section>

			<section>
				<StyledH2>Key Features</StyledH2>
				<ul>
					<li>Select</li>
					<li>Segmented Tabs</li>
					<li>Loader</li>
					<li>Switch</li>
					<li>Toast</li>
					<li>NPM package tutorial from scratch</li>
					<li>... more tutorials coming soon</li>
				</ul>
			</section>

			<footer>
				<p>&copy; 2024 smart-components-dinkar. All rights reserved.</p>
			</footer>
		</>
	);
}
