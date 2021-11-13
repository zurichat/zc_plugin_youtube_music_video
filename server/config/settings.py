import os
from pathlib import Path

import environ  # import environ
from django.core.management.commands.runserver import Command as runserver

env = environ.Env()  # Initialise environment variables
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# Declared in your environment variables
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = env("DEBUG")
# DEBUG = True
SYSTEM_ENV = env("SYSTEM_ENV")

# switches DEBUG to true or false based on the Environment variable
if SYSTEM_ENV == "Development":
    DEBUG = True
else:
    DEBUG = False
# print(DEBUG)
# DEBUG = SYSTEM_ENV == "Development"

ALLOWED_HOSTS = [
    "zuri.chat",
    "music.zuri.chat",
    "staging.zuri.chat",
    "178.63.43.138",  # new default IP for plugins on zuri.chat
    "localhost",
    "127.0.0.1",
    "*",
]
runserver.default_port = "22672"  # new default port for music plugin

# Application definition
CORS_ALLOW_ALL_ORIGINS = True

CORS_REPLACE_HTTPS_REFERER = True

INSTALLED_APPS = [
    "corsheaders",  # To Connect API with React App if required in seprate apps
    "django.contrib.admin",
    "django.contrib.sites",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "music",
    "client",
    "rest_framework",  # https://www.django-rest-framework.org/
    "rest_framework.authtoken",
    "allauth",  # https://django-allauth.readthedocs.io/en/latest/installation.html
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "django_extensions",
    "drf_spectacular",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # new
    "django.middleware.common.CommonMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "corsheaders.middleware.CorsPostCsrfMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    "178.68.43.138",
    # ...
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "../root/dist"),
        ],  # Django look for templates folder in root directory
        "APP_DIRS": True,  # Django look for templates folder in app directory
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}
# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_ROOT = str(BASE_DIR.joinpath("staticfiles"))
STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "../root/dist"),
    os.path.join(BASE_DIR, "client/dist"),
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
MEDIA_ROOT = "./media"
MEDIA_URL = "/media/"
# Fixtures
FIXTURE_DIRS = ["fixtures"]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Auth user
# Configure django-rest-framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # "music.authentication.Zuri_Token_Auth",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
    # "DEFAULT_RENDERER_CLASSES": [
    #     "rest_framework.renderers.JSONRenderer",
    # ],
    # "DEFAULT_PARSER_CLASSES": [
    #     "rest_framework.parsers.JSONParser",
    # ],
    # "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    # "DATETIME_FORMAT": "%Y-%m-%d - %H:%M:%S",
    "DATETIME_FORMAT": "%s.%f",
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
}

if DEBUG:
    REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"] = (
        "rest_framework.permissions.AllowAny",
    )

SPECTACULAR_SETTINGS = {
    "TITLE": "YouTube Music Plugin API",
    "DESCRIPTION": "YouTube Music Plugin for Zuri.Chat",
    "VERSION": "1.0.0",
    # OTHER SETTINGS
}

# For django.contrib.sites
SITE_ID = 1

# Configure django-allauth
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = None
ACCOUNT_UNIQUE_EMAIL = True

# Allow entering as a guest
ALLOW_GUEST_ACCESS = bool(os.environ.get("DJANGO_ALLOW_GUEST_ACCESS", default=""))


# CORS_ALLOWED_ORIGINS = [

# "https://sub.example.com",
# "http://localhost:8080",
# "http://localhost:8000",
# "http://localhost:9000",
# "http://localhost:3000",  # if you have seprate react app
# ]

if bool(os.environ.get("PRODUCTION_SERVER", default="")):
    SECURE_SSL_REDIRECT = True

ORGANIZATON_ID = "61695d8bb2cc8a9af4833d46"
PLUGIN_ID = "616991e5ef1c19335a2869f4"
CENTRIFUGO_TOKEN = "58c2400b-831d-411d-8fe8-31b6e337738b"
ROOM_ID = "6169d8b54bfde011fe582e65"


# current collections
ROOM_COLLECTION = "musicroom"
SONG_COLLECTION = "songs"
COMMENTS_COLLECTION = "chats"

APPEND_SLASH = False
