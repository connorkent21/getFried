import fetch from 'isomorphic-fetch';

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin" : "*",
};

export async function getImages(key) {
  let req = await fetch(`http://localhost:5000/get-images/${key}`, {
    method: 'POST',
    headers,
  } )
  .catch(err => {
    console.log('error: ', err);
  });
  let res = await req.json();
  console.log('this is the res: ', res);
  return res;
}
