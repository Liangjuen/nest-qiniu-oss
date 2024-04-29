import { QiniuOSSModuleOptions } from '../interfaces'
import { QINIU_OSS_MODULE_OPTIONS } from '../constants'

export const createQiniuOSSProvider = (options: QiniuOSSModuleOptions) => [
	{ provide: QINIU_OSS_MODULE_OPTIONS, useValue: options || {} }
]
