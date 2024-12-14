# Use an official Python runtime as a parent image
FROM python:3.9

# Arguments for environment variables
ARG SECRET_KEY
ARG AWS_S3_REGION_NAME
ARG AWS_STORAGE_BUCKET_NAME
ARG AWS_SECRET_ACCESS_KEY
ARG ALLOWED_HOSTS
ARG DB_NAME
ARG DB_USER
ARG DB_HOST
ARG DB_PASSWORD
ARG DB_PORT
ARG DEBUG
ARG MOLLIE_API_KEY
ARG AWS_ACCESS_KEY_ID

# Set environment variables for the app
ENV SECRET_KEY=${SECRET_KEY}
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_HOST=${DB_HOST}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}
ENV DEBUG=${DEBUG}
ENV MOLLIE_API_KEY=${MOLLIE_API_KEY}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_STORAGE_BUCKET_NAME=${AWS_STORAGE_BUCKET_NAME}
ENV AWS_S3_REGION_NAME=${AWS_S3_REGION_NAME}

# Prevent Python from writing .pyc files and enable unbuffered stdout
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Directory for static files
ENV STATIC_ROOT=/usr/src/app/staticfiles

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY ./bookStoreApi/requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy project files
COPY ./bookStoreApi /usr/src/app/

# Expose port for Gunicorn
EXPOSE 8000

# Command to run the app with Gunicorn
CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "--timeout", "600", "bookStoreApi.wsgi:application"]
