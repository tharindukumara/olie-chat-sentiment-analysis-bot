  
from .common.logger.logging import LogSetup
from .common.interceptors.request_interceptor import RequestInterceptor

logs = LogSetup()
request_interceptors = RequestInterceptor()