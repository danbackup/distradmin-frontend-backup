export const getFromBackend = async (collectionType, ids) => {
  const jwt = localStorage.getItem('token');
  let filterString = "";
  if(ids) {
    filterString = `?`;
    ids.forEach((id, idx) => {
      if (idx !== 0) {
        filterString += '&';
      }
      filterString += `filters[$or][${idx}][id][$eq]=${id}`;
    });
  }

  console.log('FILTER STRING: ', filterString);

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
