class CustomAPIException(Exception):
    def __init__(self, message, status,data=None):
        self.message = message
        self.status = status
        self.data=data