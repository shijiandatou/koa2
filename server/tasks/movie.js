const cp = require('child_process');
const { resolve } = require('path');

;(async () => {
    const script = resolve(__dirname,'../crawier/trailer-list');
    const child = cp.fork(script,[]);
    let invoked = false;

    child.on('error',err => {
        if(invoked) return;
        invoked = true;

        console.log(err);
    })

    child.on('exit',code => {
        if(invoked) return;

        invoked = false;
        let err = code === 0 ? null : new Error('出错了');

        console.log(err);
    });

    child.on('message',data => {
        let result = data.result;
        console.log(result);
    })
})()