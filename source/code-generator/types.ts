export const enum FrameworkSupportStatus {
	PullRequest = 'pull-request',
	Rejected = 'rejected',
	Supported = 'supported',
	Unknown = 'unknown',
}

export type IFrameworkSupport =
	| {
			name: string
			status: FrameworkSupportStatus.Supported
	  }
	| { status: FrameworkSupportStatus.Unknown }
	| { status: FrameworkSupportStatus.PullRequest }
	| { link: URL; reason: string; status: FrameworkSupportStatus.Rejected }

export interface IHttpStatus {
	/**
	 * Is this status deprecated? If yes, what’s the reason?
	 */
	deprecated:
		| false
		| {
				/**
				 * Source for the Deprecation
				 */
				link: URL
				/**
				 * Why was this deprecated?
				 */
				reason: string
		  }
	/**
	 * How is this named in various frameworks?
	 */
	frameworks: {
		/**
		 * How is this called in Django Rest Framework?
		 * @see {@link https://github.com/encode/django-rest-framework/blob/master/rest_framework/status.py}
		 */
		djangoRestFramework: IFrameworkSupport
		/**
		 * How is this called in Spring Framework?
		 * @see {@link https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/HttpStatus.html}
		 */
		springFramework: IFrameworkSupport
	}
	/**
	 * What does the RFC say about it?
	 */
	rfc:
		| false
		| {
				/**
				 * Link to most recent RFC
				 */
				link: URL
				/**
				 * How is this status called according to the RFC?
				 */
				name: string
		  }
	/**
	 * The Numeric HTTP Status Code
	 */
	statusCode: number
}

export interface ICodeGenerator {
	/**
	 * For which framework is this?
	 */
	key: keyof IHttpStatus['frameworks']

	/**
	 * Generates Framework-specific TypeScript Enums
	 */
	generateTypeScriptEnums(): string
}
