import '../css/iconfont.css';
import '../css/index.less';

const add = (a, b) => a + b;

add(1, 2);

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

promise.then(() => {
  console.log(1);
});
