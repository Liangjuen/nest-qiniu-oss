import { Module, DynamicModule } from '@nestjs/common'
import { QiniuOSSService } from './oss.service'
import { createQiniuOSSProvider } from './oss.provider'
import {
	QiniuOSSModuleOptions,
	QiniuOSSModuleAsyncOptions,
	QiniuOSSOptionsFactory
} from '../interfaces'
import { QINIU_OSS_MODULE_OPTIONS } from '../constants'

/**
 * 七牛云 OSS Module
 */
@Module({
	providers: [QiniuOSSService],
	exports: [QiniuOSSService]
})
export class QiniuOSSModule {
	static register(options: QiniuOSSModuleOptions): DynamicModule {
		return {
			module: QiniuOSSModule,
			providers: createQiniuOSSProvider(options),
			exports: createQiniuOSSProvider(options),
			global: options.global
		}
	}

	static registerAsync(options: QiniuOSSModuleAsyncOptions): DynamicModule {
		return {
			module: QiniuOSSModule,
			global: options.global,
			imports: options.imports || [],
			providers: [...this.createAsyncProviders(options)],
			exports: [QINIU_OSS_MODULE_OPTIONS]
		}
	}

	private static createAsyncProviders(options: QiniuOSSModuleAsyncOptions) {
		if (options.useExisting || options.useFactory) {
			return [this.createAsyncOptionsProvider(options)]
		}
		return [
			this.createAsyncOptionsProvider(options),
			{
				provide: options.useClass,
				useClass: options.useClass
			}
		]
	}

	private static createAsyncOptionsProvider(options: QiniuOSSModuleAsyncOptions) {
		if (options.useFactory) {
			return {
				provide: QINIU_OSS_MODULE_OPTIONS,
				useFactory: options.useFactory,
				inject: options.inject || []
			}
		}
		return {
			provide: QINIU_OSS_MODULE_OPTIONS,
			useFactory: async (optionsFactory: QiniuOSSOptionsFactory) =>
				await optionsFactory.createQiniuOSSOptions(),
			inject: [options.useExisting || options.useClass]
		}
	}
}
