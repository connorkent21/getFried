import fetch from 'isomorphic-fetch';


export async function getImages(key) {
console.log('this is the key: ', key);
  let req = await fetch('/express_backend')
  .catch(err => {
    console.log('error: ', err)
  });
  let res = await req.json();
  console.log('this is the res from the express server: ', res);
  return res;
}
