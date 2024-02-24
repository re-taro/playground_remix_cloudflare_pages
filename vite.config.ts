import { defineConfig } from "vite";
import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as cloudflare,
} from "@remix-run/dev";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import typecript from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
	build: {
		cssMinify: mode === "production",
	},
	plugins: [
		cloudflare(),
		remix({
			serverModuleFormat: "esm",
		}),
		typecript(),
		vanillaExtractPlugin(),
		mode === "analyze" &&
			visualizer({
				open: true,
				template: "flamegraph", // use `network` to see why something was included
				gzipSize: true,
				brotliSize: true,
				emitFile: true, // `emitFile` is necessary since Remix builds more than one bundle
			}),
	],
}));
