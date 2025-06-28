# test-fe

step 1
clone test-be di link https://github.com/okafuizagoto/test-be

step 2
jalankan test-be dengan command go run cmd/http/main.go

step 3
install package dengan yarn install

step 4
bikin file baru /test-fe/.env.local
dengan nama .env.local
dan file berisi sebagai berikut :
NEXT_PUBLIC_NODE_ENV=localhost
NEXT_PUBLIC_BASE_API_URL=http://localhost:4334
NEXT_TELEMETRY_DISABLED=1
NEXT_SHARP_PATH=/app/node_modules/sharp
PORT=8080

step 5
jalankan test-fe dengan command yarn dev

step 6
jalankan dengan localhost:3000/login

step 7
login dengan
user : ignokafui@gmail.com
pass : testingssz