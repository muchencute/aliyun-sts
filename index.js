const moment = require('moment');
const uuid = require('node-uuid');
const aliyunUtils = require('aliyun-utils');
const http = require('http');

/**
 * 临时授权访问类
 */
class AliyunSTS {
    /**
     * 构造函数
     * @param accessKey 阿里云 AccessKey
     * @param accessSecret 阿里云 AccessSecret
     * @param callback 回调函数
     */
    constructor(accessKey, accessSecret, callback) {
        this.accessKey = accessKey;
        this.accessSecret = accessSecret;
        this.callback = callback;
    }

    /**
     * AssumeRole 接口调用
     * @param roleArn
     * @param roleSessionName
     * @param durationSeconds
     */
    assumeRole(roleArn, roleSessionName, durationSeconds) {
        let url = 'https://sts.aliyuncs.com/?SignatureVersion=1.0';
        url += '&SignatureVersion=1.0';
        url += `&Timestamp=${moment.utc().format()}`;
        url += `&RoleArn=${roleArn}`;
        url += `&RoleSessionName=${roleSessionName}`;
        url += `&AccessKeyID=${this.accessKey}`;
        url += `&SignatureMethod=HMAC_SHA1`;
        url += `&Version=2015-04-01`;
        url += `&Action=AssumeRole`;
        url += `&SignatureNonce=${uuid.v4()}`;
        url += `&DurationSeconds=${durationSeconds}`;

        let signedString = aliyunUtils.signature(url, this.accessSecret);
        url += `&Signature=${encodeURIComponent(signedString)}`;

        http.get({}, function () {

        });
    }

}