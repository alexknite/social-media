# Social Media Application

This is a simple social media application using **React** and **Django**.

## Features

- User registration and login
- User settings
  - Profile picture
  - Username (not editable)
  - Email
  - First & Last Name
  - Bio
  - Delete account with confirmation
- User profile
  - Profile picture
  - Follower and Following counts
  - User Posts
    - Archive Post
    - Delete Post
- Create Posts
  - Description
- Home with all User Posts
- Search Users
  - Based on username, first and last name
- Report Users
  - Username
  - Reason
    - Harassment
    - Fraud
    - Spam
    - Inappropriate
    - Other
  - Description
- Admin
  - View all Posts and Post IDs
  - Archive and delete any Post
  - Admin Panel
    - Mute User
      - Prevent User from Posting
    - Ban User
      - Prevent User from logging in
    - Delete user
- Admin Dashboard
  - User Reports
    - Filter by status, reported user, reporter
    - Resolve or delete Report
    - Date Reported
    - Reported User
    - Reported By
    - Reason
    - Description
  - Admin Action Log
    - Records of Admin actions
      - Toggling mute
      - Toggling ban
      - Toggling archive
      - Deleting User
      - Deleting Post

## Coming Soon?

- Making usernames editable
- Allow Admins to view archived Posts from Home page
- Filter Admin Action Log

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
