To give permission to the db.sh file that starts docker

chmod +rwx

```bash
docker run -d \
    -p 27017:27017 \
    --name @calorie-counter-take-2/server \
    -v /Users/samuelsilva/mongo-data:/data/db \
    mongo:latest
```
