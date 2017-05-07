cd ~/Documents/RealTime-Web
git pull origin develop
cd server/
npm install
pm2 startOrRestart ecosystem.json