# Use an official Python runtime as a parent image
FROM python:3.9

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

# Apply database migrations
RUN python manage.py migrate

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
