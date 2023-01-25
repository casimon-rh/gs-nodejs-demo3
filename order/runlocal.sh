PORT=3000 JUMPS=3 ID=ORDER \
NEXT_SVC=http://localhost:3001 CHAIN_SVC=http://localhost:3001/chain \
MONGO_URL=mongodb://localhost:27018 npm run dev