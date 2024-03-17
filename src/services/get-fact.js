export async function getFact() {
  const response = await fetch('https://catfact.ninja/fact');

  if (!response.ok) return Promise.reject(new Error(response.statusText));

  const data = await response.json();

  return data.fact;
}