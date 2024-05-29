# Use an official Python runtime as a parent image
FROM python:3.9
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

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the directory for static files
ENV STATIC_ROOT /usr/src/app/staticfiles

# Set work directory to the subdirectory containing manage.py
WORKDIR /usr/src/app/bookStoreApi

# Install dependencies
# Make sure to copy the requirements.txt file from the correct location
COPY ./bookStoreApi/requirements.txt /usr/src/app/bookStoreApi/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app/bookStoreApi/
# Adjust the COPY command to copy from the bookStoreApi subdirectory
COPY ./bookStoreApi/ /usr/src/app/bookStoreApi/

# Debug environment variables
RUN echo "SECRET_KEY=${SECRET_KEY}" && \
    echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" && \
    echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" && \
    echo "AWS_STORAGE_BUCKET_NAME=${AWS_STORAGE_BUCKET_NAME}" && \
    echo "AWS_S3_REGION_NAME=${AWS_S3_REGION_NAME}"



# Expose the port the app runs on
EXPOSE 8000

# Run the application with Gunicorn
CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "myapp.wsgi:application"]
