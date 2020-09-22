const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });
    return promise;
};


setTimeout(() => {
    console.log('Timer is done!');
    fetchData()
        .then(done => {
        console.log(done);
        return fetchData();
        })
        .then(done2 => {
            console.log(done2);
        });
}, 2000);
console.log('Hello');
console.log('Hi');