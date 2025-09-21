import { AppCodeWrapper } from '../../common/AppCodeWrapper';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassTSX } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';
import { HelmetComponent } from '../HelmetComponent';

const StyledH2 = ({ children }) => {
	return <h2 style={{ marginBottom: '0.5rem' }}>{children}</h2>;
};

export function HomePage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<>
			<HelmetComponent />

			<header>
				<StickyHeader
					heading="Smart Components Dinkar"
					subtitle="Building from scratch!"
					withThemeSelector
				/>
			</header>

			<section>
				<StyledH2>About</StyledH2>
				Welcome to <strong>DevDinkar CodeBook</strong> (smart-components-dinkar
				package)! This project contains a collection of smart components
				designed to ease your web application development by providing reusable
				and efficient solutions for common UI patterns. You can see the
				tutorials and components usage here from the left navbar for your
				different requirements.
			</section>

			<section>
				<StyledH2>Quick Start</StyledH2>
				<p>Get started with smart-components-dinkar in just a few steps:</p>
				<AppCodeWrapper
					isCodeHighlighted={Boolean(isCodeHighlighted)}
				>
					{'npm install smart-components-dinkar'}
				</AppCodeWrapper>
				<p>Then import and use any component:</p>
				<AppCodeWrapper
					isCodeHighlighted={Boolean(isCodeHighlighted)}
					languageClass={codeHighlightClassTSX}
				>
					{'import { Select, Button, Toast } from \'smart-components-dinkar\';'}
				</AppCodeWrapper>
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
				<p>
					&copy; {new Date().getFullYear()} smart-components-dinkar. All rights
					reserved.
				</p>
			</footer>
		</>
	);
}
