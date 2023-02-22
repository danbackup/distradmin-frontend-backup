export const getFromBackend = async (collectionType, ids) => {
  const jwt = localStorage.getItem('token');
  let filterString = `?`;
  
  ids.forEach((id, idx) => {
    if (idx !== 0) {
      filterString += '&';
    }
    filterString += `filters[$or][${idx}][id][$eq]=${id}`;
  });

  console.log('FILTER STRING: ', filterString);

  const res = await fetch(
    `http://localhost:1337/api/${collectionType}${filterString}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.json();
};
