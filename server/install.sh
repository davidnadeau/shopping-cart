#!/bin/bash
# Author    David Nadeau
# Purpose   Install and configure backend software for shopping cart
# Date	    08-28-2014

# ensure server is ready before running script
printf "Have you:\n"
printf "1) Run this script as root, and\n"
read -p "2) created the nginx vhost config file? [Y/n] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
        exit 1
fi

printf "Update System ...\n"
apt-get update

printf "Install basic software ...\n"
apt-get -y install vim curl perl git
update-alternatives --config editor


PUBLICIP=$(curl -s icanhazip.com)
USER='david'
WWW='/var/www'

printf "Uninstall unused http server\n"
service apache2 stop
apt-get purge apache2 apache2-utils apache2.2-bin apache2-common
apt-get autoremove --purge


printf "********************************************************\n"
printf "Installing shopping cart debian linux environment\n"

printf "Create user ...\n"
useradd -m $USER
passwd $USER
printf "Grant new user root privaleges...\n"
visudo

printf "Install ftp server ...\n"
apt-get install -y vsftpd

printf "Configure ftp ...\n"
CONF='/etc/vsftpd.conf'
sed -i 's/anonymous_enable=YES/anonymous_enable=NO/' $CONF
sed -i 's/#write_enable=YES/write_enable=YES/' $CONF
sed -i 's/#local_enable=YES/local_enable=YES/' $CONF
echo 'pasv_enable=YES' >> $CONF
echo 'pasv_min_port=1024' >> $CONF
echo 'pasv_max_port=1048' >> $CONF
echo 'pasv_address='$PUBLICIP >> $CONF
service vsftpd restart

printf "Install PHP ...\n"
apt-get -y install php5 php5-gd php5-curl

printf "Install MariaDB ...\n"
apt-get -y install python-software-properties
apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db
add-apt-repository 'deb http://mirror.stshosting.co.uk/mariadb/repo/10.0/debian wheezy main'
apt-get update
apt-get -y install mariadb-server php5-mysql
mysql -u root -p < schema.sql

printf "Install Nginx ...\n"
apt-get install nginx php5-fpm php5-cli php5-mcrypt
CONF=/etc/nginx/sites-available/default
mv nginx.conf default
mv default $CONF
CONF=/etc/php5/fpm/php.ini
sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' $CONF
CONF=/etc/php5/fpm/pool.d/www.conf
sed -i 's/listen = 127.0.0.1:9000/listen = /var/run/php5-fpm.sock/' $CONF

service php5-fpm restart
service apache2 stop
service nginx restart

printf "Install PHP Composer ...\n"
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

printf "Install Laravel ...\n"
cd $WWW
rm index.html
composer create-project laravel/laravel laravel 4.2.*
chown -R $USER $WWW/laravel
chmod -R 777 $WWW/laravel/app/storage

printf "Configuration complete!\n"