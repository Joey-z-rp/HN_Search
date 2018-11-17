import crossFetch from 'cross-fetch';

export default function fetch(url: string, options?: object) {
    return crossFetch(url, {
        headers: { Accept: 'application/json' },
        ...options,
    }).then(response => response.json());
}
