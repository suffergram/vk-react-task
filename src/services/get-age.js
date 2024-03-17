export async function getAge(name) {
  const host = 'https://api.agify.io/';
  const response = await fetch(`${host}?name=${name}`);

  if (!response.ok) return Promise.reject(new Error(response.statusText));

  const data = await response.json();

  return data;
}