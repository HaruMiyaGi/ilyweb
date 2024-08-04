import { useCallback, useEffect, useState } from 'react';

export default function useResize(gridId: string) {
	const [size, setSize] = useState({ width: 250, height: 250 });

	const onResizeHandler = useCallback(() => {
		const element = document.getElementById(gridId);
		if (element) {
			setSize({
				width: element.clientWidth,
				height: element.clientHeight,
			});
		} else {
			setSize({ width: 250, height: 250 });
		}
	}, [gridId]);

	useEffect(() => {
		onResizeHandler();
		window.addEventListener('resize', onResizeHandler);
		return () => window.removeEventListener('resize', onResizeHandler);
	}, [gridId, onResizeHandler]);

	return { data: size, action: onResizeHandler };
}
