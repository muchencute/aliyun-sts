const AliyunSTS = require('./index.js');

let aliyunSts = new AliyunSTS('Eud6M1yBZq0Ax3vG', 'euoyxkZ1kdsG0CE5nvm7AuqdNF0m1T&');
aliyunSts.assumeRole('acs:ram::1889630797507648:role/aliyunossdefaultrole', 'test', 3600);