import type { LayoutServerLoad } from "./$types";
import { payload as P } from '$lib/server';

export const load: LayoutServerLoad = async ({locals}) => {
    return {
        deviceType: locals.deviceType,
		media: await P?.find({ collection: 'media', pagination: false, where: {masonry:{equals: true}} })
    }
};
