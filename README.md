# Social Media Application

This is a simple social media application using **React** and **Django**.

## Features

## Setup

Establish virtual environment

    python3 -m venv .venv

Activate virtual environment

    source .venv/bin/activate

Install dependencies

    pip install -r requirements.txt

Start backend

    cd backend
    python3 manage.py migrate
    python3 manage.py runserver

Start frontend

    cd ../frontend
    npm i
    npm run dev
