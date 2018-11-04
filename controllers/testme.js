urls = {
  'cookie': {cookie1: 'https://google.ca'},
  'notCookie': {cookie2: 'https://youtube.ca'},
  'user1': {'b2xVn2': 'http://www.lighthouselabs.ca'},
  'user2': {'9sm5xK': 'http://www.google.com'},
  '0bl155': {'asdfgh': 'http://www.facebook.com'},
};

const innerUrls = (urls) => {
  urls =
    Object.assign(
        {},
        ...function _flatten(urls) {
          return [].concat(...Object.keys(urls)
              .map((k) =>
        typeof urls[k] === 'object' ?
          _flatten(urls[k]) :
          ({[k]: urls[k]})
              )
          );
        }(urls));
  return urls;
};
console.log(innerUrls(urls));
