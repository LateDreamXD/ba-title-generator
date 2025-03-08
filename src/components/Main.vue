<script setup lang="ts">
import {ref, onMounted} from 'vue';
import LogoCanvas from '../canvas';
import initI18n from '../i18n';

const textL = ref('Blue'),
	  textR = ref('Archive'),
	  subText = ref('ブルーアーカイブ'),
	  subTextSize = ref(40),
	  transparentBg = ref(false),
	  swapColors = ref(false),
	  darkMode = ref(false),
	  graphX = ref(-15),
	  graphY = ref(0),
	  accentColor = ref('#128AFA');

const draw = async(action?: 'copyImg' | 'saveImg') => {
	const canvas = new LogoCanvas({
		textL: textL.value,
		textR: textR.value,
		subText: subText.value,
		subTextSize: subTextSize.value,
		swapColors: swapColors.value,
		transparentBg: transparentBg.value,
		darkMode: darkMode.value,

		// advance
		graphOffset: {X: graphX.value, Y: graphY.value},
		accentColor: accentColor.value,
	});
	await canvas.draw();
	// canvas.saveImg();
	// canvas.copyImg();
	(!!action && !!canvas[action]) && canvas[action]();
	return canvas;
};
const drawAndCopy = () => {
	const copyBtn: HTMLAnchorElement = document.querySelector('a[href="#copy"]')!;
	copyBtn.style.pointerEvents = 'none';
	draw('copyImg');
	const originalText = copyBtn.innerHTML;
	copyBtn.innerHTML = '✅';
	setTimeout(() => {
		copyBtn.style.pointerEvents = 'auto';
		copyBtn.innerHTML = originalText
	}, 2000);
}
onMounted(() => {
	initI18n();
	draw();
});
</script>

<template>
	<div id="main" class="window">
		<div class="header">
			<span class="title" data-i18n="title"></span>
			<span class="actions">
				<a href="#copy" title="Copy" role="button" @click.prevent="drawAndCopy()"><svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m7.5 3c-1.38 0-2.5 1.12-2.5 2.5v8c0 1.38 1.12 2.5 2.5 2.5h6c1.38 0 2.5-1.12 2.5-2.5v-8c0-1.38-1.12-2.5-2.5-2.5h-6zm-1.5 2.5c0-0.828 0.672-1.5 1.5-1.5h6c0.828 0 1.5 0.672 1.5 1.5v8c0 0.828-0.672 1.5-1.5 1.5h-6c-0.828 0-1.5-0.672-1.5-1.5v-8z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"/><path d="m8 6.5c0-0.276 0.224-0.5 0.5-0.5h4c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-4c-0.276 0-0.5-0.224-0.5-0.5z" fill="currentColor"/><path d="m8 9.5c0-0.276 0.224-0.5 0.5-0.5h4c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-4c-0.276 0-0.5-0.224-0.5-0.5z" fill="currentColor"/><path d="m8 12.5c0-0.276 0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-3c-0.276 0-0.5-0.224-0.5-0.5z" fill="currentColor"/><path d="m0 2.5c0-1.38 1.12-2.5 2.5-2.5h6c0.979 0 1.83 0.562 2.24 1.38 0.152 0.303-0.104 0.618-0.443 0.618-0.227 0-0.422-0.149-0.549-0.338-0.269-0.399-0.726-0.662-1.24-0.662h-6c-0.828 0-1.5 0.672-1.5 1.5v8c0 0.828 0.672 1.5 1.5 1.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-1c-1.38 0-2.5-1.12-2.5-2.5v-8z" fill="currentColor"/></svg></a>
				<a href="#save" title="Save" role="button" @click.prevent="draw('saveImg')"><svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m3.5 1c-1.38 0-2.5 1.12-2.5 2.5v7.17c0 0.663 0.263 1.3 0.732 1.77l1.83 1.83c0.469 0.469 1.1 0.732 1.77 0.732h7.17c1.38 0 2.5-1.12 2.5-2.5v-9c0-1.38-1.12-2.5-2.5-2.5h-9zm5.5 10h-3.5c-0.276 0-0.5 0.224-0.5 0.5v2.46c0.107 0.024 0.217 0.0364 0.328 0.0364h3.67v-3zm-7-7.5c0-0.828 0.672-1.5 1.5-1.5h0.5v4.5c0 0.828 0.672 1.5 1.5 1.5h5c0.828 0 1.5-0.672 1.5-1.5v-4.5h0.5c0.828 0 1.5 0.672 1.5 1.5v9c0 0.828-0.672 1.5-1.5 1.5h-0.5v-2.5c0-0.828-0.672-1.5-1.5-1.5h-5c-0.828 0-1.5 0.672-1.5 1.5v1.79l-1.56-1.56c-0.281-0.281-0.439-0.663-0.439-1.06v-7.17zm9-1.5h-6v4.5c0 0.276 0.224 0.5 0.5 0.5h5c0.276 0 0.5-0.224 0.5-0.5v-4.5z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"/></svg></a>
				<a href="#" role="button" class="not-allowed" @click.prevent><svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m3.5 8c-0.0684 0-0.133-0.013-0.195-0.0391-0.0586-0.026-0.111-0.0618-0.156-0.107-0.0456-0.0456-0.0814-0.0977-0.107-0.156-0.026-0.0618-0.0391-0.127-0.0391-0.195s0.013-0.132 0.0391-0.19c0.026-0.0618 0.0618-0.116 0.107-0.161 0.0456-0.0488 0.0977-0.0863 0.156-0.112 0.0618-0.026 0.127-0.0391 0.195-0.0391h9c0.0683 0 0.132 0.013 0.19 0.0391 0.0618 0.026 0.116 0.0635 0.161 0.112 0.0456 0.0456 0.0814 0.0993 0.107 0.161 0.0261 0.0586 0.0391 0.122 0.0391 0.19s-0.013 0.133-0.0391 0.195c-0.026 0.0586-0.0618 0.111-0.107 0.156-0.0456 0.0456-0.0993 0.0814-0.161 0.107-0.0586 0.026-0.122 0.0391-0.19 0.0391h-9z" fill="currentColor" transform="translate(0 4)"></path></svg></a>
				<a href="#" role="button" class="not-allowed" @click.prevent><svg class="icon" viewBox="0 0 16 16" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m9.8 4h-3.6c-0.577 0-0.949 7.8e-4 -1.23 0.0239-0.272 0.0222-0.372 0.0599-0.422 0.0851-0.188 0.0959-0.341 0.249-0.437 0.437-0.0252 0.0494-0.0629 0.15-0.0851 0.422-0.0232 0.283-0.0239 0.656-0.0239 1.23v3.6c0 0.577 7.8e-4 0.949 0.0239 1.23 0.0222 0.272 0.0599 0.372 0.0851 0.422 0.0959 0.188 0.249 0.341 0.437 0.437 0.0494 0.0252 0.15 0.0629 0.422 0.0851 0.283 0.0231 0.656 0.0239 1.23 0.0239h3.6c0.577 0 0.949-8e-4 1.23-0.0239 0.272-0.0222 0.372-0.0599 0.422-0.0851 0.188-0.0959 0.341-0.249 0.437-0.437 0.0252-0.0495 0.0629-0.15 0.0851-0.422 0.0231-0.283 0.0239-0.656 0.0239-1.23v-3.6c0-0.577-8e-4 -0.949-0.0239-1.23-0.0222-0.272-0.0599-0.372-0.0851-0.422-0.0959-0.188-0.249-0.341-0.437-0.437-0.0495-0.0252-0.15-0.0629-0.422-0.0851-0.283-0.0232-0.656-0.0239-1.23-0.0239zm-6.58 0.092c-0.218 0.428-0.218 0.988-0.218 2.11v3.6c0 1.12 0 1.68 0.218 2.11 0.192 0.376 0.498 0.682 0.874 0.874 0.428 0.218 0.988 0.218 2.11 0.218h3.6c1.12 0 1.68 0 2.11-0.218 0.376-0.192 0.682-0.498 0.874-0.874 0.218-0.428 0.218-0.988 0.218-2.11v-3.6c0-1.12 0-1.68-0.218-2.11-0.192-0.376-0.498-0.682-0.874-0.874-0.428-0.218-0.988-0.218-2.11-0.218h-3.6c-1.12 0-1.68 0-2.11 0.218-0.376 0.192-0.682 0.498-0.874 0.874z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"></path></svg></a>
				<a href="#" role="button" class="not-allowed" @click.prevent><svg class="icon" viewBox="0 0 16 16" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m8 8.71-4.15 4.15c-0.0976 0.0977-0.215 0.146-0.352 0.146-0.143 0-0.264-0.0472-0.361-0.142-0.0944-0.0977-0.142-0.218-0.142-0.361 0-0.137 0.0488-0.254 0.146-0.352l4.15-4.15-4.15-4.15c-0.0976-0.0976-0.146-0.216-0.146-0.356 0-0.0684 0.013-0.133 0.0391-0.195 0.026-0.0618 0.0618-0.114 0.107-0.156 0.0456-0.0456 0.0993-0.0814 0.161-0.107s0.127-0.0391 0.195-0.0391c0.137 0 0.254 0.0488 0.352 0.146l4.15 4.15 4.15-4.15c0.0977-0.0976 0.216-0.146 0.356-0.146 0.0683 0 0.132 0.013 0.19 0.0391 0.0618 0.026 0.116 0.0618 0.161 0.107 0.0456 0.0456 0.0814 0.0993 0.107 0.161 0.0261 0.0586 0.0391 0.122 0.0391 0.19 0 0.14-0.0488 0.259-0.146 0.356l-4.15 4.15 4.15 4.15c0.0977 0.0977 0.146 0.215 0.146 0.352 0 0.0683-0.013 0.133-0.0391 0.195-0.026 0.0618-0.0618 0.116-0.107 0.161-0.0423 0.0456-0.0944 0.0814-0.156 0.107-0.0619 0.0261-0.127 0.0391-0.195 0.0391-0.14 0-0.259-0.0488-0.356-0.146l-4.15-4.15z" fill="currentColor"></path></svg></a>
			</span>
		</div>
		<div class="body">
			<div id="edit-panel" class="pico">
				<div class="edit-group">
					<span class="force-inline">
						<input title="Left part" type="text" placeholder="Blue" style="color: #128AFA; border-color: #128AFA; margin-bottom: 0;" v-model="textL" @change="draw()" />
						<input title="Right part" type="text" placeholder="Archive" style="border-color: #fff; margin-bottom: 0;" v-model="textR" @change="draw()" />
					</span>
					<span style="display: block; text-align: right;">
						<input title="Sub title" type="text" placeholder="ブルーアーカイブ" style="border-color: #fff; width: 50%; height: 50%; font-size: 50%;" v-model="subText" @change="draw()" />
					</span>
				</div>
				<div class="edit-group">
					<span class="title" data-i18n="general"></span>
					<div class="item">
						<input type="checkbox" role="switch" id="transparent-background" v-model="transparentBg" @change="draw()" />
						<label for="transparent-background" data-i18n="transparent-background"></label>
					</div>
					<div class="item">
						<input type="checkbox" role="switch" id="swap-colors" v-model="swapColors" @change="draw()" />
						<label for="swap-colors" data-i18n="swap-colors"></label>
					</div>
					<div class="item">
						<input type="checkbox" role="switch" id="dark-mode" v-model="darkMode" @change="draw()" />
						<label for="dark-mode" data-i18n="dark-mode"></label>
					</div>
				</div>
				<div class="edit-group">
					<span class="title" data-i18n="advance"></span>
					<div class="item">
						<label data-i18n="halo-cross"></label>
						<div class="force-inline" style="width: 50%;">
							<span class="force-inline"><label class="inline-text" for="graph-x">X</label><input type="number" id="graph-x" v-model="graphX" @change="draw()" /></span>
							<span class="force-inline"><label class="inline-text" for="graph-y">Y</label><input type="number" id="graph-y" v-model="graphY" @change="draw()" /></span>
						</div>
					</div>
					<div class="item">
						<label for="accent-color" data-i18n="accent-color"></label>
						<input type="color" id="accent-color" v-model="accentColor" @change="draw()" />
					</div>
					<div class="item">
						<label for="sub-text-size" data-i18n="sub-text-size"></label>
						<input type="number" id="sub-text-size" v-model="subTextSize" @change="draw()" />
					</div>
				</div>
				<div class="edit-group mobile-only">
					<a href="https://github.com/LateDreamXD/ba-title-generator" target="_blank" rel="noopener noreferrer" data-i18n="github-repo" style="display: block;"></a>
					<button type="button" class="primary" @click="drawAndCopy()" data-i18n="copy"></button>
					<button type="button" class="secondary" @click="draw('saveImg')" data-i18n="save" style="margin-left: 0.4em;"></button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.body {
	padding: 0 !important;
}
#edit-panel {
	width: 100%;
	height: 100%;
	overflow: inherit;
	padding: 8px;
}
.edit-group.advance {
	background-color: var(--pico-background-color);
}
input[type="number"], input[type="color"] {
	padding: 0;
	height: 2em;
	width: 2.5rem;
}
input[type="color"] {
	padding: 4px;
}
.force-inline {
	display: inline-flex !important;
	align-items: baseline;
}
.inline-text {
	margin-left: 0.4rem;
	margin-right: 0.4rem;
}
@media screen and (max-width: 768px) {
	#edit-panel>.edit-group:not(:nth-child(1)) {
		padding: 8px;
	}
}
</style>