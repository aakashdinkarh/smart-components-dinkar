import React, { useEffect, useRef, useState, memo } from 'react';
import { getCombinedClass } from 'utils/getCombinedClass';

import { Loader } from '../../exports';
import type { loaderVariant } from '../Loader';

export const LazyImageWithLoader = memo(function LazyImageWithLoader({
	imgSrc,
	alt = '',
	imgWidth,
	imgHeight,
	imgContainerClass = '',
}: {
	imgSrc: string;
	alt?: string;
	imgWidth?: number;
	imgHeight?: number;
	imgContainerClass?: string;
	loaderVariant?: loaderVariant;
}) {
	const imgRef = useRef<HTMLImageElement>(null);
	const [isImgLoaded, setIsImgLoaded] = useState(false);

	useEffect(() => {
		if (imgRef.current) {
			imgRef.current.onload = () => {
				setIsImgLoaded(true);
			};
		}
	}, []);

	return (
		<div
			className={getCombinedClass('rel', imgContainerClass)}
			style={{ flex: `0 0 ${imgWidth}px`, height: imgHeight }}
		>
			{!isImgLoaded && (
				<div className='abs-center'>
					<Loader variant='dots-bounce' />
				</div>
			)}
			<img ref={imgRef} height={imgHeight} width={imgWidth} loading='lazy' src={imgSrc} alt={alt} />
		</div>
	);
})
