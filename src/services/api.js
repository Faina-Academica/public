export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxdQ_lViG4GJ3Vbmo4qfRp84LPMdjHTyw480dgOl34PzW6lrVtJgvOJYKE7-nOBIj1/exec';

export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchRaw(url, parse) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await (parse === 'json' ? response.json() : response.text());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

/** Fetches JSON. Returns { data, error } — never throws. */
export const fetchContent = (url) => fetchRaw(url, 'json');

/** Fetches plain text. Returns { data, error } — never throws. */
export const fetchText = (url) => fetchRaw(url, 'text');
