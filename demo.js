const AliyunSTS = require('./index.js');

// 调用接口
let aliyunSts = new AliyunSTS('Eud6M1yBZq0Ax3vG', 'euoyxkZ1kdsG0CE5nvm7AuqdNF0m1T&');
aliyunSts.assumeRole('acs:ram::1889630797507648:role/aliyunossdefaultrole', 'test', 3600, function (status, object) {
    console.log(status);
    console.log(typeof object);
    console.log(object);
});