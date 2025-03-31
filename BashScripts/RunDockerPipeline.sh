docker build --build-arg VITE_BACKEND_HOST=http://localhost \
             --build-arg VITE_BACKEND_PORT=2000 \
             --no-cache -f Docker/dockerfile-IMS-Frontend \
             -t ja-ims-frontend:latest .

docker tag ja-ims-frontend:latest darliedcjw/ja-ims-frontend:latest
docker push darliedcjw/ja-ims-frontend:latest