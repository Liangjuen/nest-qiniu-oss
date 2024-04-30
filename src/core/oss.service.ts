import { Injectable, Inject, Optional } from '@nestjs/common'
import * as qiniu from 'qiniu'
import { QINIU_OSS_MODULE_OPTIONS } from '../constants'
import { QiniuOSSModuleOptions } from '../interfaces'

/**
 * 七牛云 OSS 服务
 */
@Injectable()
export class QiniuOSSService {
	constructor(
		@Optional()
		@Inject(QINIU_OSS_MODULE_OPTIONS)
		private readonly qiniuOSSOptions: QiniuOSSModuleOptions
	) {}

	/**
	 * 获取 qiniu
	 */
	get engine() {
		return qiniu
	}

	/**
	 * 获取配置
	 */
	get options() {
		return this.qiniuOSSOptions
	}

	/**
	 * @description 创建配置
	 * @param config 实例配置
	 * @returns
	 */
	createConfig(config?: qiniu.conf.ConfigOptions) {
		return new qiniu.conf.Config({
			zone: this.options.zone,
			...config
		})
	}

	/**
	 * @description 创建鉴权对象
	 * @see [客户端上传凭证](https://developer.qiniu.com/kodo/sdk/nodejs#simple-uptoken)
	 * @returns 鉴权对象
	 */
	mac(): qiniu.auth.digest.Mac {
		return new qiniu.auth.digest.Mac(
			this.options.accessKey,
			this.options.secretKey,
			this.options.macOptions
		)
	}

	/**
	 * @description 创建上传策略
	 * @see [上传策略](https://developer.qiniu.com/kodo/1206/put-policy)
	 * @param options 配置
	 * @returns `policy`
	 */
	createPutPolicy(options: qiniu.rs.PutPolicyOptions) {
		return new qiniu.rs.PutPolicy(options)
	}

	/**
	 * @description 创建上传 token
	 * @see https://developer.qiniu.com/kodo/1208/upload-token
	 * @param options [上传策略配置](https://developer.qiniu.com/kodo/1206/put-policy)
	 * @returns
	 */
	createUploadToken(options: qiniu.rs.PutPolicyOptions) {
		return this.createPutPolicy(options).uploadToken(this.mac())
	}

	/**
	 * @description 创建 bucket 管理器
	 * @see [bucketManager](https://developer.qiniu.com/kodo/1289/nodejs#7)
	 * @param config
	 * @returns
	 */
	createBucketManager(config?: qiniu.conf.ConfigOptions) {
		return new qiniu.rs.BucketManager(this.mac(), {
			...this.createConfig(),
			...config
		})
	}

	/**
	 * @description 构建CdnManager对象
	 * @see [构建CdnManager对象](https://developer.qiniu.com/kodo/sdk/nodejs#9)
	 * @returns CdnManager
	 */
	createCdnManager(mac?: qiniu.auth.digest.Mac) {
		return new qiniu.cdn.CdnManager(mac || this.mac())
	}
}
