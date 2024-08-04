import dynamic from 'next/dynamic';

const FocusGraphWrapper = dynamic(() => import('../FocusGraph'), {
	ssr: false,
});

export default FocusGraphWrapper;
