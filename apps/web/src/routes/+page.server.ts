import { payload as P } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		media: await P?.find({ collection: 'media', pagination: false })
	};
};
