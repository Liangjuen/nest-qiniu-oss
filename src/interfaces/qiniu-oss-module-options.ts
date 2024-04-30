import { ModuleMetadata, Type } from '@nestjs/common'
import { conf, auth } from 'qiniu'

/**
 * 存储区域
 * @see https://developer.qiniu.com/kodo/1671/region-endpoint-fq
 */
export type Region = 'z0' | 'cn-east-2' | 'z1' | 'z2' | 'na0' | 'as0' | 'ap-southeast-2'

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
	 * 存储区域 若不配置，将会通过 AK 与 Bucket 查询对应区域。若非必要，建议不配置区域信息
	 * @see https://developer.qiniu.com/kodo/1671/region-endpoint-fq
	 */
	region?: Region

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
