// vite.config.ts
import { defineConfig } from "file:///C:/Users/Zayd%20Tahir/port20/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Zayd%20Tahir/port20/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/Zayd%20Tahir/port20/node_modules/lovable-tagger/dist/index.js";
import viteCompression from "file:///C:/Users/Zayd%20Tahir/port20/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Zayd Tahir\\port20";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Gzip compression for production
    viteCompression({
      algorithm: "gzip",
      ext: ".gz"
    }),
    // Brotli compression (even smaller)
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br"
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui": ["lucide-react"],
          "vendor-utils": ["aos"]
        }
      }
    },
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 1e3
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lucide-react"]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxaYXlkIFRhaGlyXFxcXHBvcnQyMFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcWmF5ZCBUYWhpclxcXFxwb3J0MjBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1pheWQlMjBUYWhpci9wb3J0MjAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA1MTczLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgICAvLyBHemlwIGNvbXByZXNzaW9uIGZvciBwcm9kdWN0aW9uXHJcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICBhbGdvcml0aG06ICdnemlwJyxcclxuICAgICAgZXh0OiAnLmd6JyxcclxuICAgIH0pLFxyXG4gICAgLy8gQnJvdGxpIGNvbXByZXNzaW9uIChldmVuIHNtYWxsZXIpXHJcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICAgIGV4dDogJy5icicsXHJcbiAgICB9KSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgJ3ZlbmRvci1yZWFjdCc6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgICAndmVuZG9yLXJvdXRlcic6IFsncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgICAgICAgJ3ZlbmRvci11aSc6IFsnbHVjaWRlLXJlYWN0J10sXHJcbiAgICAgICAgICAndmVuZG9yLXV0aWxzJzogWydhb3MnXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRhcmdldDogJ2VzMjAyMCcsXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJywgJ2x1Y2lkZS1yZWFjdCddLFxyXG4gIH0sXHJcbn0pKTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQTBRLFNBQVMsb0JBQW9CO0FBQ3ZTLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxxQkFBcUI7QUFKNUIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUE7QUFBQSxJQUUxQyxnQkFBZ0I7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQTtBQUFBLElBRUQsZ0JBQWdCO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSCxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFVBQ3JDLGlCQUFpQixDQUFDLGtCQUFrQjtBQUFBLFVBQ3BDLGFBQWEsQ0FBQyxjQUFjO0FBQUEsVUFDNUIsZ0JBQWdCLENBQUMsS0FBSztBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsU0FBUyxhQUFhLG9CQUFvQixjQUFjO0FBQUEsRUFDcEU7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
