# aliyun-sts
阿里云临时授权

## 安装
`npm install aliyun-sts`

## Demo
```ecmascript 6
const AliyunSTS = require('./index.js');
const appKey = '< App Key >';
const appSecret = '< App Secret >';

// 调用接口
let aliyunSts = new AliyunSTS(appKey, appSecret);
aliyunSts.assumeRole('acs:ram::1889630797507648:role/aliyunossdefaultrole', 'test', 3600, function (status, object) {
    console.log(status);
    console.log(typeof object);
    console.log(object);
});
```