import { useEffect, useState } from 'react';

export default function useResize(gridId: string) {
	const [size, setSize] = useState({ width: 250, height: 250 });

	const onResize = () => {
		const element = document.getElementById(gridId);
		if (element) {
			setSize({
				width: element.clientWidth,
				height: element.clientHeight,
			});
		} else {
			setSize({
				width: 250,
				height: 250,
			});
		}
	};

	useEffect(() => {
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [gridId]);

	return { data: size, action: onResize };
}
