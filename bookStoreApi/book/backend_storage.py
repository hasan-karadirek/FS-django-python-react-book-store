from storages.backends.s3boto3 import S3Boto3Storage

class StaticStorage(S3Boto3Storage):
    location = 'static'
    default_acl = None  # Do not set ACLs
    object_parameters = {
        'CacheControl': 'max-age=86400',
    }

class MediaStorage(S3Boto3Storage):
    location = 'media'
    default_acl = None  # Do not set ACLs
    file_overwrite = False
    object_parameters = {
        'CacheControl': 'max-age=86400',
    }
