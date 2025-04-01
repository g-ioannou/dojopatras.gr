import { payload as P } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		users: await P?.find({ collection: 'users' }),
		media: await P?.find({ collection: 'media', pagination: false }),
        news: await P?.find({collection: 'news-and-announcements'})
	};
};
