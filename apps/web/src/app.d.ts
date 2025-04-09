// See https://kit.svelte.dev/docs/types#app

import type { WebsiteInfo } from '@repo/payload/types';
import type { DevicePayload } from 'sveltekit-device-detector';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			deviceType: DevicePayload;
			websiteInfo: WebsiteInfo | undefined;
		}
		interface PageData {
			deviceType: DevicePayload;
			websiteInfo: WebsiteInfo | undefined;
		}
		// interface Platform {}
	}
}

export {};
