import axios from 'axios';

const URL = 'https://api.punkapi.com/v2/beers/';

export const fetchData = (page: number) =>
  axios.get(URL, {
    params: {
      page,
    },
  });

export const fetchDataById = (id: number) =>
  axios.get(URL + id).then((res) => res.data[0]);
