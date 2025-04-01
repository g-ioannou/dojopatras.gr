import isMobile from 'ismobilejs';

export function getDeviceType(userAgent: string | null) {
	return isMobile(userAgent ?? '');
}
