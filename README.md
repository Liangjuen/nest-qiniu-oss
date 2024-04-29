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
import { QiniuOSSModule, QiniuOSSService } from 'qiniu'

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
            // 存储区域编码
            zone: 'z2',
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
import { QiniuOSSModule, QiniuOSSService } from 'qiniu'

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
                    zone: 'z2',
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

