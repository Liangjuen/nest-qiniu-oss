# [nest-qiniu-oss](https://github.com/Liangjuen/nest-qiniu-oss)

## 安装
```
npm i nest-qiniu-oss
```

## 使用

### 注册
``` ts
// upload.module.ts
import { Module } from '@nestjs/common'
import { UploadController } from './upload.controller'
import { conf } from 'qiniu'
import { QiniuOSSModule, QiniuOSSService } from 'nest-qiniu-oss'

@Module({
	imports: [
		QiniuOSSModule.register({
            // 七牛云 AccessKey
			accessKey: 'your qiniu accessKey',
            // 七牛云 SecretKey
			secretKey: 'your qiniu secretKey',
            // 指定上传空间
			bucket: 'bucket',
            // 域名配置
            domain: 'http://bucket.test',
            // 存储区域编码 官方不推荐使用(已弃用)
            // zone: conf.Zone,
			// 存储区域 'z0' | 'cn-east-2' | 'z1' | 'z2' | 'na0' | 'as0' | 'ap-southeast-2'
			// 查看: https://developer.qiniu.com/kodo/1671/region-endpoint-fq
			region: 'z0'
            // 注册为 nest 应用的全局模块
			global: true
		})
	],
	controllers: [UploadController],
	providers: [QiniuOSSService],
	exports: []
})
export class UploadModule {}
```


### 使用异步注册

``` ts
// upload.module.ts
import { Module } from '@nestjs/common'
import { UploadController } from './upload.controller'
import { conf } from 'qiniu'
import { QiniuOSSModule, QiniuOSSService } from 'nest-qiniu-oss'

@Module({
	imports: [
		QiniuOSSModule.registerAsync({
			imports: [],
			useFactory: () => {

			// do some thing ...
			// 一般在此之前通过注入 configService 加载配置

			return {
			    accessKey: 'your qiniu accessKey',
			    secretKey: 'your qiniu secretKey',
			    bucket: 'bucket',
			    domain: 'http://bucket.test',
				region: 'z0'
			    global: true
			}
			}
		})
	],
	controllers: [UploadController],
	providers: [QiniuOSSService],
	exports: []
})
export class UploadModule {}
```

### service

``` ts
import { Injectable } from '@nestjs/common'
import { QiniuOSSService } from 'nest-qiniu-oss'

@Injectable()
export class UploadService {
	constructor(private readonly qiniuOSSService: QiniuOSSService) {}

	getUploadToken() {
		// 创建鉴权对象
		const mac = this.qiniuOSSService.mac()

		// 创建配置
		const conf = this.qiniuOSSService.createConfig()

		// 创建上传策略
		const putPolicy = this.qiniuOSSService.createPutPolicy({
			scope: this.qiniuOSSService.options.bucket
		})

		// 创建上传凭证
		return putPolicy.uploadToken(mac)
	}
}
```

