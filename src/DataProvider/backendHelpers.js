export const getFromBackendFilterById = async (collectionType, ids) => {
  const jwt = localStorage.getItem('token');
  let filterString = `?`;

  ids.forEach((id, idx) => {
    if (idx !== 0) {
      filterString += '&';
    }
    filterString += `filters[$or][${idx}][id][$eq]=${id}`;
  });

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/${collectionType}${filterString}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.json();
};

export const callBackend = async (method, endpoint, params, body) => {
  const jwt = localStorage.getItem('token');
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    params,
    body,
  });
  return res.json();
};
