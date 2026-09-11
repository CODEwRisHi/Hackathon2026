#!/usr/bin/env bash
set -o errexit

echo ">>> Building Frontend (React)..."
cd frontend
npm install
npm run build
cd ..

echo ">>> Setting up Backend (Python)..."
cd backend
pip install -r requirements.txt
python seed_data.py