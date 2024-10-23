# FS Django Python React Book Store

This project is a full-stack web application for managing a book store, built using Django (Python) for the backend and React (JavaScript) for the frontend. The backend provides RESTful APIs, while the frontend offers an interactive user interface for customers to browse and purchase books. Docker is used to simplify deployment, ensuring that the application can be run in a containerized environment.

## Features

- **Book Management**: Add, view, edit, and delete books from the catalog.
- **Customer Management**: Register, view, and manage customer information.
- **Payment System**: Integration of payment functionality for purchasing books.
- **Store Operations**: Manage orders and process payments.
- **Frontend (React)**: An interactive interface for customers to browse the catalog, view book details, and complete purchases.
- **Backend (Django)**: REST APIs to handle all store operations, including book and customer management, and order processing.
- **Docker Integration**: Easily containerize and deploy the application.

## Project Structure

### Main Components

- **`bookStoreApi/`**: The main Django project that contains all the apps for backend functionality.
  - **`book/`**: Handles all book-related operations such as listing, adding, updating, and deleting books.
  - **`customer/`**: Manages customer data, including registration, login, and profile management.
  - **`payment/`**: Manages the payment functionality, allowing customers to pay for their purchases.
  - **`store/`**: Handles store operations like managing orders, inventory, and transactions.
  - **`frontend/`**: The React frontend integrated with Django for serving templates and static files.

### Detailed Structure

#### `book/`

Handles book-related operations:
- **`models.py`**: Defines the `Book` model for managing book data.
- **`views.py`**: API endpoints for handling book-related operations (CRUD).
- **`serializers.py`**: Serializers for converting complex data types into JSON format.
- **`urls.py`**: Routes for accessing book-related APIs.
- **`backend_storage.py`**: Manages backend storage for book data.

#### `customer/`

Handles customer-related operations:
- **`models.py`**: Defines the `Customer` model for managing customer data.
- **`views.py`**: API endpoints for customer registration, login, and profile management.
- **`serializers.py`**: Serializes customer data for API responses.
- **`management/`**: Custom management commands for handling customer-related operations.
- **`urls.py`**: Routes for accessing customer-related APIs.

#### `payment/`

Handles payment-related operations:
- **`models.py`**: Defines the `Payment` model for managing payment data and transactions.
- **`views.py`**: API endpoints for processing payments.
- **`serializers.py`**: Serializes payment data.
- **`urls.py`**: Routes for accessing payment-related APIs.

#### `store/`

Handles overall store functionality:
- **`models.py`**: Defines the `Order` and `Transaction` models for handling store orders.
- **`views.py`**: API endpoints for managing orders and transactions.
- **`serializers.py`**: Serializes order and transaction data.
- **`urls.py`**: Routes for accessing store-related APIs.

## Installation

### Prerequisites

- Docker
- Python 3.x
- Node.js & npm (for frontend development)

### Steps

1. **Clone the Repository**:  
   git clone https://github.com/yourusername/FS-django-python-react-book-store.git

2. **Navigate to the Project Directory**:  
   cd FS-django-python-react-book-store/bookStoreApi

3. **Install Python Dependencies**:  
   pip install virtualenv  
   virtualenv venv  
   source venv/bin/activate  
   pip install -r requirements.txt

4. **Run Django Migrations**:  
   python manage.py migrate

5. **Start the Django Development Server**:  
   python manage.py runserver

6. **Install Frontend Dependencies**:  
   Navigate to the frontend folder and install the necessary packages:  
   cd frontend  
   npm install  
   npm start

7. **Run Using Docker**:  
   Build and run the Docker container:  
   docker build -t book-store-app .  
   docker run -p 8000:8000 book-store-app

## Usage

Once the server is running, visit the application in your browser:

- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000 (if running React separately)

The frontend will allow users to browse books, add them to the cart, and complete purchases, while the backend handles API requests for managing books, customers, orders, and payments.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

