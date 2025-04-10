import type { PageServerLoad } from './$types';
import { payload as P } from '$lib/server';

export const load: PageServerLoad = async ({ parent }) => {
	const { websiteInfo } = await parent();
	return {
		websiteInfo: websiteInfo,
		recentAnnouncements: await P?.find({
			collection: 'news-and-announcements',
			depth: 3,
			where: {
				or: [{ draft: { equals: null } }, { draft: { equals: false } }]
			},
			sort: ['pinned', '-createdAt'],
			limit: 3,
			pagination: false
		})
	};
};
