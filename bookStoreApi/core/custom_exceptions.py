class CustomAPIException(Exception):
    def __init__(self, message, status, name=None, data=None):
        self.message = message
        self.status = status
        self.data = data
        self.name = name
