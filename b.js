const fs = require('fs');

(function(){
  const a = fs.readFileSync('tmp', 'utf8');
  const b = fs.readFileSync('a.txt', 'utf8');
  const urls = a.split('\n').slice(0, 100);
  const ps = eval(b);
  const zip = (arr1, arr2) => arr1.map((x, i) => [x, arr2[i]]);
  const len = zip(urls, ps.map(x => x.length));
  const slen = len.sort((a, b) => a[1] - b[1]);
  for(var x of slen)
    console.log(x[1], x[0]);
})();
