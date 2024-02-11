# Use an official Python runtime as a parent image
FROM python:3.9
ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}
ARG ALLOWED_HOSTS
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}
ARG DB_NAME
ENV DB_NAME=${DB_NAME}
ARG DB_USER
ENV DB_USER=${DB_USER}
ARG DB_HOST
ENV DB_HOST=${DB_HOST}
ARG DB_PASSWORD
ENV DB_PASSWORD=${DB_PASSWORD}
ARG DB_PORT
ENV DB_PORT=${DB_PORT}
ARG DEBUG
ENV DEBUG=${DEBUG}
ARG MOLLIE_API_KEY
ENV MOLLIE_API_KEY=${MOLLIE_API_KEY}

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

# Collect static files
RUN python manage.py collectstatic --noinput

# Run migrate command
RUN python manage.py migrate

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
