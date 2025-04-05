import type { PageServerLoad } from './$types';
import { payload as P } from '$lib/server';

export const load: PageServerLoad = async () => {
	return {
		recentAnnouncements: await P?.find({
			collection: 'news-and-announcements',
			depth: 3,
			where: {
				or: [{ draft: { equals: null } }, { draft: { equals: false } }],
			},
			sort: ['-pinned', '-created_at'],
			limit: 3,
			pagination: false
		})
	};
};
