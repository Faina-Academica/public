import { fetchContent, APPS_SCRIPT_URL } from './api.js';

let _cache = null;
let _inflight = null;

export function fetchCodigoFileId() {
	if (_cache) return Promise.resolve(_cache);
	if (_inflight) return _inflight;

	_inflight = fetchContent(`${APPS_SCRIPT_URL}?type=codigo`).then(({ data, error }) => {
		if (error) return { data: null, error };
		if (data?.error || !data?.fileId)
			return { data: null, error: 'O documento não está disponível de momento.' };

		return (_cache = { data: data.fileId, error: null });
	});

	return _inflight;
}
