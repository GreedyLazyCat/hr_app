export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBase,
  });

  return {
    provide: {
      api,
    },
  };
});
