import os
from environs import Env, EnvError


basedir = os.path.abspath(os.path.dirname(__file__))
env = Env()
env.read_env()

class Config:
    # Application Configs
    DEBUG = False
    APPLICATION_ROOT = '/api'
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    CORS_HEADER = 'Content-Type'

    # Logging Setup
    LOG_TYPE = env.str("LOG_TYPE", "stream")  # Default is a Stream handler
    LOG_LEVEL = env.str("LOG_LEVEL", "INFO")

    # File Logging Setup
    LOG_DIR = env.str("LOG_DIR", "/data/logs")
    APP_LOG_NAME = env.str("APP_LOG_NAME", "app.log")
    WWW_LOG_NAME = env.str("WWW_LOG_NAME", "www.log")
    LOG_MAX_BYTES = env.int("LOG_MAX_BYTES", 100_000_000)  # 100MB in bytes
    LOG_COPIES = env.int("LOG_COPIES", 5)

    


class DevelopmentConfig(Config):
    DEBUG = True
    LOG_LEVEL = "DEBUG"


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    LOG_LEVEL = "DEBUG"


class ProductionConfig(Config):
    DEBUG = False


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)