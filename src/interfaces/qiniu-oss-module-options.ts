import { ModuleMetadata, Type } from '@nestjs/common'
import { conf, auth } from 'qiniu'

export interface QiniuOSSModuleOptions {
	/**
	 * 用于鉴权对象 `mac` 的 `accessKey`
	 * @see [Access Key](https://developer.qiniu.com/kodo/1289/nodejs#4)
	 */
	accessKey: string

	/**
	 * 用于鉴权对象 `mac` 的 `secretKey`
	 * @see [Secret Key](https://developer.qiniu.com/kodo/1289/nodejs#4)
	 */
	secretKey: string

	/**
	 * 指定上传空间 `bucket`
	 * @see [Bucket](https://developer.qiniu.com/kodo/1289/nodejs#4)
	 */
	bucket: string

	/**
	 * 七牛云空间访问的域名
	 * @see https://portal.qiniu.com/cdn/domain
	 */
	domain?: string

	/**
	 * 地区
	 * @see https://developer.qiniu.com/kodo/1671/region-endpoint-fq
	 */
	zone?: conf.Zone

	/**
	 * 鉴权对象配置
	 */
	macOptions?: auth.digest.MacOptions

	/**
	 * 配置为 nest 应用的全局模块
	 */
	global?: boolean
}

export interface QiniuOSSOptionsFactory {
	createQiniuOSSOptions(): Promise<QiniuOSSModuleOptions> | QiniuOSSModuleOptions
}

export interface QiniuOSSModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	global?: boolean
	useExisting?: Type<QiniuOSSOptionsFactory>
	useClass?: Type<QiniuOSSOptionsFactory>
	useFactory?: (...args: any[]) => Promise<QiniuOSSModuleOptions> | QiniuOSSModuleOptions
	inject?: any[]
}
