export const serializeToQuery = (obj, prefix) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p];
      if (v === undefined || v === '') continue;
      const value =
        v !== null && typeof v === 'object'
          ? serializeToQuery(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v);
      if (!value) continue;
      str.push(value);
    }
  }
  return str.join('&');
};

export const getUrlWithParam = (baseUrl, params) => {
  const Url = new URL(baseUrl);
  Url.search = serializeToQuery(params);
  return Url.toString();
};

export const getAbsoluteApiUrl = (url, baseUrl = '') => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (!url.startsWith('/')) {
    url = `/${url}`;
  }
  return `${baseUrl}${url}`;
};
