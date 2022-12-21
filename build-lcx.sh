/Applications/HBuilderX-Alpha.app/Contents/MacOS/cli publish --platform h5 --project tiko-acg-h5

sudo rm -rf unpackage/dist/build/h5-build/*
cp -r unpackage/dist/build/h5/* unpackage/dist/build/h5-build/
cd unpackage/dist/build/h5-build/
git add -A .
git commit -m 'x'
git push -f origin master

sudo ssh -i /Users/siyuan/Documents/www/taike/tiko.pem root@47.95.197.6 'cd /opt/data/acg-h5 && git fetch --all && git reset --hard origin/master && git pull'
