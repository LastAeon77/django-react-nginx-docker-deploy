# django-react-nginx-docker-deploy
A boilerplate djangoapp with frontend to easily deploy with certbot and fully dockerized.

Django is configured with very basic django-rest-framework setup.

Next.js is configured with axios.

Still in Beta! If you notice errors please tell.

# Initial Setup

The major thing missing here is a proper SECRET_KEY for django.

In backend/settings.py, have a proper secret key. Whether through an env file or something else.

I did not provide a secret key for you. I would advise putting the secret key in an .env file and use python-environ to get the key for additional security.
```python
SECRET_KEY=env['secret_key']
```

# Running locally for test. (No Docker)
Note: Most of this assumes a windows environment. You might need to adjust the commands slightly if on linux to fit.
## Backend (Django)
Open a new terminal

cd into backend folder
```
cd backend
```
Set debug=True in backend/settings.py

Uncomment ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, and CSRF_TRUSTED_ORIGINS like so

If your react app isn't 3000, you probably want to update it to the port your react app is using.

If your django app isn't at 8000, you probably want to update it to the port django is using.
```python
ALLOWED_HOSTS = [
    #"https://example.com",
    #"https://sub.example.com",
    'localhost:8000' # This depends on your frontend's port usage during testing.
]

CORS_ALLOWED_ORIGINS = [
    #"https://example.com",
    #"https://sub.example.com",
    "http://localhost:3000", # For testing
    "http://127.0.0.1:3000", # For testing
]
# If you want to allow the site to make changes to the database through requests.
CSRF_TRUSTED_ORIGINS = [
    # "https://example.com",
    "http://127.0.0.1:3000", # For testing
    "http://localhost:3000", # For testing
]

```
Install all needed library in requirements.txt
```
pip install -r "requirements.txt"
```
Run local server
```
python manage.py runserver
```

## Frontend (next.js)
Open a new terminal

cd into the frontend folder

```
cd frontend
```
Take note of this code in pages/_app.tsx
```typescript
if (typeof window !== "undefined") {
  if (window.location.origin !== "http://localhost:3000") {
    axios.defaults.baseURL = window.location.origin;
  }
  else {
    axios.defaults.baseURL = "http://localhost:8000/"
  }
}
```
Above code checks if we are on localhost:3000 or not (which is the default port react uses). If it is it will start redirecting to localhost:8000 (django default)

If your react app isn't 3000, you probably want to update it to the port your react app is using.

If your django app isn't at 8000, you probably want to update it to the port django is using.

Install needed libraries from package.json
```
npm install
```
Start server
```
npm run dev
```

# Running production on a virtual private server

YOU DON'T NEED TO UPLOAD THE WHOLE FRONTEND FOLDER

We don't want to burden the server with expensive npm build process. So we will only need to upload the .next folder and the package.json and package-lock.json folder.

If you are using classic react, the folder name may change, and you will need to adjust accordingly.

First, cd into frontend
```
cd frontend
```
Run build
```
npm run build
or 
next build
```
You should now have the .next folder in your frontend directory. Please remember that the django files are configured to be used node.js server and WILL run npm start to activate the site. If you wish to have a static HTML page for whatever reason you will need to configure it yourself.

## Changing/configuring files before deployment

You probably want to do this locally. Assume project root directory.

### Backend
In backend/settings.py. replace example to your domain. 
For example, if your domain is aeonmoon.com
```
"https://example.com" ->"https://aeonmoon.com"
```
If you configure subdomain to have malcute.aeonmoon.com

```
"https://sub.example.com" ->"https://malcute.aeonmoon.com"
```
```python
ALLOWED_HOSTS = [
    "https://example.com",
    "https://sub.example.com",
    #'localhost:8000' This depends on your frontend's port usage during testing.
                ]

CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    # "http://localhost:3000", # For testing
    # "http://127.0.0.1:3000", # For testing
]
# If you want to allow the site to make changes to the database through requests.
CSRF_TRUSTED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
#  "http://127.0.0.1:3000", # For testing
#  "http://localhost:3000", # For testing
    ]
```

### nginx config
Reference: https://github.com/wmnnd/nginx-certbot

docker/nginx/default.conf

Change ALL sub.example.com to your domain. Every instance. There should be 6 total! You may add more to fit your domain configurations.
```
"sub.example.com" ->"malcute.aeonmoon.com"
or
"sub.example.com" ->"aeonmoon.com"

depending on your own domain settings. You can have both too, but you'll need to add it in.
```

## Virtual Private server configurations
THESE EXAMPLES ASSUME YOU WILL USE DigitalOcean SERVER. OTHER SERVERS MAY HAVE DIFFERENT NEEDS. 

Make sure you have an ssh key ready to configure to your droplet: https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/

Buy a droplet (virtual private server) here. I'm using the cheap 6$ one. https://www.digitalocean.com/products/droplets

Configure to allow SSH to use Putty for file upload and future interactions: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04

## SSH into droplet
Setting up ssh key: https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/

If on windows, I reccomend using the putty method https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/putty/


## Installing docker
Reference: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

On the linux server, install Docker.
```
sudo apt update
```
```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```
```
apt-cache policy docker-ce
```
```
sudo apt install docker-ce
```
```
sudo systemctl status docker
```

Then install docker compose
```
sudo apt-get install docker-compose-plugin
sudo curl -L "https://github.com/docker/compose/releases/download/v2.16.2/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

```
This setup forces you to use sudo everytime you use docker commands. If you want to setup docker command without sudo, the reference above details how you can do exactly that.

## Connecting domain to digitalOcean
I assume you have already connected your domain to digital ocean. 

If not, use this guide: https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/


## Uploading files to VPS/droplet
Personally I use filezilla to accomplish the task. Make a folder to keep the project inside the droplet and upload everything inside it.

### Getting the fake certificate for initial setup
Reference: https://github.com/wmnnd/nginx-certbot

First, get the file to the working directory in the VPS

```
curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh
```

This script is created to create dummy certificates before starting the docker. Edit the domains and email to your own with:

```
nano init-letsencrypt.sh
```

In the file, you will see comments to configure your domain into the data.

```
domains=(example.com www.example.com) => domains=(aeonmoon.org www.aeonmoon.org)
or
domains=(example.com www.example.com) => domains=(malcute.aeonmoon.org www.malcute.aeonmoon.org)
```
Change email
```
email="" => email="whatever@email.com"
```
Staging: As mentioned in the comment, set to 1 for testing.
```
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits
```
DO NOT EDIT THIS IN WINDOWS. It will break the .sh file.

## Acquiring certificate for https

To be allowed to use HTTPS, you will first need to run a script to get dummy certificates
```
sudo /bin/bash init-letsencrypt.sh
```
This will create docker/nginx/certbot/conf/ and docker/nginx/certbot/www/ in docker folder.

Make sure you are in the project directory. (docker-compose.yml should be in the directory you are inhabiting)

## Run docker-compose
```
sudo docker-compose -f docker-compose.yml up -d --build
```
Go to your domain. Your website after everything should be up and running!