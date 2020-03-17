const fs = require('fs');

(function(){
  const a = fs.readFileSync('a3.txt', 'utf8');
  const d = JSON.parse(a);
  const s = d.sort((a, b) => a[1].length - b[1].length);
  console.log(s.filter(a => ! a[1].some(b => b.indexOf('network') != -1)));
  console.log(d);
})();
