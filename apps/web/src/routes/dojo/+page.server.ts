import type { PageServerLoad } from './$types';
import { payload as P } from '$lib/server';

export const load: PageServerLoad = async () => {
	return {
		instructors: await P?.find({ collection: 'coaches', pagination: false })
	};
};
