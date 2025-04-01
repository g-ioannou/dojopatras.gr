import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleDeviceDetector } from 'sveltekit-device-detector';

export const detectDevice: Handle = handleDeviceDetector({})

export const handle = sequence(detectDevice);
