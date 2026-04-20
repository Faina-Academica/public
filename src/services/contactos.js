import { fetchContent, APPS_SCRIPT_URL } from './api.js';

let _cache = null;
let _inflight = null;

export function fetchContactos() {
  if (_cache) return Promise.resolve(_cache);
  if (_inflight) return _inflight;

  _inflight = fetchContent(`${APPS_SCRIPT_URL}?type=contactos`).then(({ data, error }) => {
    _inflight = null;
    if (error) return { data: null, error };
    if (data?.error || !data || typeof data !== 'object' || Array.isArray(data))
      return { data: null, error: 'Não foi possível carregar os dados.' };

    const CS_KEY = 'Conselho do Salgado';
    const cs = data[CS_KEY] ?? null;
    const comissoes = Object.entries(data)
      .filter(([key]) => key !== CS_KEY)
      .map(([nome, email]) => ({ nome, email }))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));

    return (_cache = { data: { cs, comissoes }, error: null });
  });

  return _inflight;
}
