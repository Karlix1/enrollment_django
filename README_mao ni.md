<<<<<<< HEAD
# enrollment_django
=======
# Student Management System – Django REST Framework

A simple CRUD-based student management system using Django and Django REST Framework.

## Features

* Full CRUD operations for Students, Teachers, Courses, and Enrollments
* RESTful API with Django REST Framework
* Modern React UI with TypeScript and Tailwind CSS
* SQLite database (no additional setup required)
* CORS-enabled for frontend-backend communication

## Tech Stack

* **Backend**: Python, Django 6, Django REST Framework, SQLite
* **Frontend**: React (Create React App), TypeScript, Tailwind CSS
* **Other**: CORS headers, Virtual environment



## How to Run

### Prerequisites
- **Python 3.10+** (download from [python.org](https://www.python.org/))
- **Node.js 16+** (download from [nodejs.org](https://nodejs.org/))
- **Git** (for cloning the repo)

### Setup Instructions

1. **Clone or Copy the Project**
   ```bash
   git clone <your-repo-url> enrollment_django
   cd enrollment_django
   ```

2. **Backend Setup (Django)**
   - **Linux/Mac:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     pip install -r requirements.txt
     python manage.py makemigrations
     python manage.py migrate
     python manage.py runserver 8000
     ```
   - **Windows:**
     ```cmd
     python -m venv .venv
     .venv\Scripts\activate
     pip install -r requirements.txt
     python manage.py makemigrations
     python manage.py migrate
     python manage.py runserver 8000
     ```

3. **Frontend Setup (React + TypeScript + Tailwind)**
   - Open a **new terminal/command prompt** and navigate to the frontend folder:
     ```bash
     cd frontend
     npm install
     npm start
     ```

### Usage
- **Backend API**: Runs on http://127.0.0.1:8000/api
- **Frontend UI**: Runs on http://localhost:3000 (or 3001 if 3000 is taken)
- Switch tabs to manage Students, Teachers, Courses, Enrollments
- Use forms to add, edit (✏️), or delete (🗑️) items

### Troubleshooting
- If `python` isn't recognized on Windows, use `py` or `python3`
- If virtual env activation fails, ensure the `.venv` folder exists
- For CORS issues, ensure both servers are running
- If ports are in use, change Django port: `python manage.py runserver 8001` and update `frontend/.env` to `REACT_APP_API_URL=http://localhost:8001/api`

Start the development server:

```bash
npm start
```

The React app will run on port 3000 and proxy API requests to the Django server on port 8000.

The API URL is set in `.env`:

```bash
REACT_APP_API_URL=http://localhost:8000/api
```


>>>>>>> 3cbaefd (Full-stack enrollment system with CRUD operations)
