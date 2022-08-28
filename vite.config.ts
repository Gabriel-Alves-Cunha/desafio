import type { UserConfigExport } from "vite";

import { configDefaults, defineConfig } from "vitest/config";
import { VitePluginNode } from "vite-plugin-node";
import { resolve } from "node:path";

const outBuildDir = resolve(__dirname, "./build");

export default defineConfig(({ mode }) => {
	const isDev = mode === "development";

	const config: UserConfigExport = {
		test: {
			includeSource: ["src/tests/**/*.{js,ts}"],
			environment: "node",
			logHeapUsage: true,
			dir: "./tests",
			coverage: {
				// reporter: ["html", "text"],
				reporter: ["text"],
				// all: true,
			},
			exclude: [
				...configDefaults.exclude,
				"**/seeLeakedVariables.ts",
				"**/.eslintrc.{js,cjs}",
				"**/styles.ts",
				"**/global.ts",
				"coverage/**",
				"**/*.d.ts",
			],
		},

		define: { "import.meta.vitest": "undefined" },
		plugins: [
			...VitePluginNode({
				// Nodejs native Request adapter
				// currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
				// you can also pass a function if you are using other frameworks, see Custom Adapter section
				adapter: "koa",

				// tell the plugin where is your project entry
				appPath: "../src/server.ts",

				// Optional, default: 'viteNodeApp'
				// the name of named export of you app from the appPath file
				exportName: "server",
			}),
		],
		root: outBuildDir,
		envDir: "./",
		base: "./",

		build: {
			chunkSizeWarningLimit: 1_000,
			reportCompressedSize: false,
			outDir: outBuildDir,
			emptyOutDir: true,
			target: "node14",
			sourcemap: isDev,
			minify: isDev,
			rollupOptions: {
				input: resolve(__dirname, "src/server.ts"),
				output: {
					assetFileNames: "assets/[name].[ext]",
					minifyInternalExports: isDev,
					entryFileNames: "[name].js",
					chunkFileNames: "[name].js",
					sourcemap: isDev,
					compact: isDev,
					format: "esm",
				},
			},
		},

		esbuild: {
			treeShaking: true,
			sourcemap: isDev,
			target: "esnext",
			format: "esm",
		},

		resolve: {
			alias: [
				{
					find: "@controllers",
					replacement: resolve(__dirname, "src/controllers"),
				},
				{ find: "@api", replacement: resolve(__dirname, "src/api") },
				{ find: "@src", replacement: resolve(__dirname, "src") },
			],
		},
	};

	return config;
});
