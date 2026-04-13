// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@vite-pwa/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxt/icon",
  ],
  css: ["~/assets/main.css"],
  ssr: false,
  pwa: {
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: "LaundryMator",
      short_name: "LaundryMator",
      description: "A laundry scheduler app",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "screenshot-desktop.png",
          type: "image/png",
          form_factor: "wide",
          sizes: "1542x1102",
        },
        {
          src: "screenshot-mobile.png",
          type: "image/png",
          form_factor: "narrow",
          sizes: "780x1684",
        },
      ],
    },
  },
});
