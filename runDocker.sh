docker run -d -p 3000:3000 --name backend --mount source=vol1,target=/usr/src/app backend:1.0.0
docker build . -t backend:1.0.0