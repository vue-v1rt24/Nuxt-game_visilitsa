export default defineEventHandler(async (event) => {
  const res = await $fetch<string>(
    'https://api.randomdatatools.ru?unescaped=false&params=FirstName',
  );

  const data = JSON.parse(res);

  return {
    name: data.FirstName,
  };
});
