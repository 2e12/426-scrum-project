# Sell2Buy

## Backend

Make sure that the following steps have been followed.

### Installation

Make sure you have python 3 installed. We recommend version `3.8`, because we are developing on this version.

Then install all python dependencies with:
```shell script
$ pip install -r requirements.txt
```

### Start backend

Start the backend Server with:
```shell script
$ python -m backend
```
This will start the HTTP server. By default port 8000 and host 0.0.0.0 are used. 
Set the environment variable `CHAT_HOST` and `CHAT_PORT` to overwrite them.

## Frontend

Located in /frontend. Do the following thing to get it up and running.

### Installation 
Move into the frontend folder and do
 ```shell script
 $ npm install
 ```
after that, it should be started with 
```shell script
$ ionic serve
```
