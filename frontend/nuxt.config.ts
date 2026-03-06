import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon"],
  css: ["./app/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  vite: {
    // @ts-expect-error @nuxt/schema 4.3.1 inlines vite types, breaking compatibility with @tailwindcss/vite
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:4000",
    },
  },
});
