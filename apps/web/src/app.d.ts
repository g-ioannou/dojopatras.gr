// See https://kit.svelte.dev/docs/types#app

import type { DevicePayload } from 'sveltekit-device-detector';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			deviceType: DevicePayload;
		}
		interface PageData {
			deviceType: DevicePayload;
        }
		// interface Platform {}
	}
}

export {};
