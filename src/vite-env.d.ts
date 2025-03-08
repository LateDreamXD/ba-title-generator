/// <reference types="vite/client" />

interface Window {
	[key: string]: any;
}

declare const app: {
	name: string,
	version: string,
}

declare type drawConfig = {
	textL?: string,
	textR?: string,
	subText?: string,
	subTextSize?: number,
	darkMode?: boolean,
	swapColors?: boolean,
	transparentBg?: boolean,
	graphOffset?: {X: number, Y: number},
	accentColor?: string,
}
