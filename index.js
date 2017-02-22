const moment = require('moment');
const uuid = require('node-uuid');
const aliyunUtils = require('aliyun-utils');
const http = require('https');

/**
 * 临时授权访问类
 */
class AliyunSTS {
    /**
     * 构造函数
     * @param accessKey 阿里云 AccessKey
     * @param accessSecret 阿里云 AccessSecret
     */
    constructor(accessKey, accessSecret) {
        this.accessKey = accessKey;
        this.accessSecret = accessSecret;
    }

    /**
     * AssumeRole 接口调用
     * @param roleArn
     * @param roleSessionName
     * @param durationSeconds
     * @param callback 回调函数
     */
    assumeRole(roleArn, roleSessionName, durationSeconds, callback) {
        let url = 'https://sts.aliyuncs.com/?SignatureVersion=1.0';
        url += '&Format=JSON';
        url += `&Timestamp=${encodeURIComponent(moment.utc().format())}`;
        url += `&RoleArn=${encodeURIComponent(roleArn)}`;
        url += `&RoleSessionName=${roleSessionName}`;
        url += `&AccessKeyId=${this.accessKey}`;
        url += `&SignatureMethod=HMAC-SHA1`;
        url += `&Version=2015-04-01`;
        url += `&Action=AssumeRole`;
        url += `&SignatureNonce=${uuid.v4()}`;
        url += `&DurationSeconds=${durationSeconds}`;

        let signedString = aliyunUtils.signature(url, this.accessSecret);
        url += `&Signature=${encodeURIComponent(signedString)}`;

        http.get(url, function (resp) {
            if (resp.statusCode == 200) {
                let entity = '';
                resp.on('data', function (data) {
                    entity += data;
                }).on('end', function () {
                    callback(resp.statusCode, JSON.parse(entity));
                });
            } else {
                callback(status);
            }
        }).on('error', function (error) {
            console.log(error.message);
        });
    }

}

module.exports = AliyunSTS;