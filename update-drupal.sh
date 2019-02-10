#!/usr/bin/env bash
set -e # exit when any command fails

BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
LIGHTGREEN='\033[1;32m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
USER=$(whoami)
USERDB="${USER}.sql.xz"

function fail {
  printf "${RED}$1${NC}\n"
  exit 1
}

function announce {
  printf "${YELLOW}$1...${NC}\n"
}

function success {
  printf "${GREEN}$1!${NC}\n"
}

printf "Let's update ${BLUE}Drupal${NC}!\n"
printf "Don't worry we will backup the database ${BLUE}${USER}${NC} before applying the update!\n"
announce "Going to ~/html/"
cd ~/html/ || fail "Sorry, I can't go to the html directory!"

echo "Please enter the minor and patch version, separated with a dot."
printf "So for Drupal 8.${GREEN}5.13${NC} just enter ${GREEN}5.13${NC}\n"

while [[ -z $version ]]
do
  read -p "> " version
  if [ -z $version ]
  then
    echo "Don't just hit enter! Gimme a number!"
  fi
done

filename=drupal-8.${version}.tar.gz
announce "Downloading ${filename}"
wget --content-disposition https://ftp.drupal.org/files/projects/${filename} || fail "Sorry, I can't download the file!"

if [ ! -s ./$filename ]
then
  fail "Downloaded file doesn't exist or is empty"
fi
success "Download of ${LIGHTGREEN}${filename}${GREEN} was successful"

announce "Backing up database ${USER} into ${USER}.sql.xz"
mysqldump $USER | xz > ~/$USERDB || fail "Sorry, I could not backup your precious data!"
success "Backup was successful"

announce "Extracting ${filename}"
set +e # allow errors
tar -xzf $filename --strip-components=1
set -e # exit when any command fails
success "Extracting was probably successful, don't mind the errors ¯\_(^_^)_/¯"

echo "Remove downloaded file again? It's not needed anymore."

while [[ $removal == '' ]] || [[ $removal != 'n' ]] && [[ $removal != 'no' ]] && [[ $removal != 'y' ]] && [[ $removal != 'yes' ]]
do
  echo "Enter 'y'/'yes' or 'n'/'no'"
  read -p "> " removal
done

if [[ $removal == 'y' ]] || [[ $removal == 'yes' ]]
then
  announce "Removing ${filename}"
  rm $filename && success "${filename} removed" || announce "${filename} could not been removed. Try again manually please"
fi

if [[ $removal != 'y' ]] && [[ $removal != 'yes' ]]
then
  announce "Ok then we keep ${filename}"
fi

printf "Done updating  ${BLUE}Drupal${NC}!\n"
echo "Now run database update script by going to /update.php"
echo "And then clear the cache in /admin/config/development/performance"
