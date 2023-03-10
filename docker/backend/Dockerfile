# docker/backend/Dockerfile

FROM python:3.9.5-slim
# Create the directory
WORKDIR /app

# prevents the project from being littered with .pyc file 
ENV PYTHONDONTWRITEBYTECODE 1
# https://stackoverflow.com/questions/59812009/what-is-the-use-of-pythonunbuffered-in-docker-file
# For seeing our output in realtime
ENV PYTHONUNBUFFERED 1

# copy over requirements .txt so we can install correct libraries
ADD ./backend/requirements.txt /app/backend/

# upgrade pip to the latest version
RUN pip install --upgrade pip
# install gunicorn to talk with wsgi in django
RUN pip install gunicorn

# install all the django l
RUN pip install -r backend/requirements.txt

# copy the docker files. This step is not strictly neccesarry. 
ADD ./docker /app/docker

# Copy the actual django project to app/backend.
ADD ./backend /app/backend