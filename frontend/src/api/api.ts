export const get = <T>(url: string): Promise<T> => {
  return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}${url}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      return res.json();
    });
};

export const post = <T, R>(url: string, data: T): Promise<R> => {
  return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  }).then(res => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  });
};

export const put = <T, R>(url: string, data: T): Promise<R> => {
  return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}${url}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  }).then(res => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  });
};

export const remove = (url: string): Promise<boolean> => {
  return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}${url}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  }).then(res => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.ok;
  });
};
