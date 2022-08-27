import { configDefaults, defineConfig } from "vitest/config";
import { resolve } from "node:path";

const outBuildDir = resolve(__dirname, "./build");

export default defineConfig(({ mode }) => ({
	test: {
		includeSource: ["src/tests/**/*.{js,ts}"],
		setupFiles: "../src/tests/setupTests.ts",
		environment: "node",
		logHeapUsage: true,
		dir: "./src/tests",
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
	root: outBuildDir,
	plugins: [],
	envDir: "./",
	base: "./",

	build: {
		sourcemap: mode === "development",
		chunkSizeWarningLimit: 1_000,
		reportCompressedSize: false,
		outDir: outBuildDir,
		emptyOutDir: true,
		minify: "esbuild",
		target: "esnext",
		rollupOptions: {
			output: {
				minifyInternalExports: mode === "development",
				assetFileNames: "assets/[name].[ext]",
				sourcemap: mode === "development",
				compact: mode === "development",
				entryFileNames: "[name].js",
				chunkFileNames: "[name].js",
				format: "esm",
			},
		},
	},

	esbuild: {
		sourcemap: mode === "development",
		treeShaking: true,
		target: "esnext",
		format: "esm",
	},

	resolve: {
		alias: [
			{ find: "@server", replacement: resolve(__dirname, "src/server") },
			{ find: "@api", replacement: resolve(__dirname, "src/api") },
			{ find: "@src", replacement: resolve(__dirname, "src") },
		],
	},
}));
