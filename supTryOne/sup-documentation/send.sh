#!/bin/bash

# 3670769222
# LEMIBLO

echo && echo "sup:1"

curl --verbose --cookie "cookie.txt" --cookie-jar "cookie.txt" https://services.indiald.com/eu/default.asp

echo && echo "sup:2"

curl --verbose --cookie "cookie.txt" --cookie-jar "cookie.txt" https://services.indiald.com/eu/_login.asp \
	-H 'authority: services.indiald.com' \
	-H 'cache-control: max-age=0' \
	-H 'origin: https://services.indiald.com' \
	-H 'upgrade-insecure-requests: 1' \
	-H 'content-type: application/x-www-form-urlencoded' \
	-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3928.0 Safari/537.36' \
	-H 'sec-fetch-user: ?1' \
	-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' \
	-H 'sec-fetch-site: same-origin' \
	-H 'sec-fetch-mode: navigate' \
	-H 'referer: https://services.indiald.com/eu/default.asp' \
	-H 'accept-encoding: gzip, deflate, br' \
	-H 'accept-language: en-US,en;q=0.9' \
	--data 'ConnectId=3670769222&password=LEMIBLO&FormButton=Login' --compressed

echo && echo "sup:3"

curl --verbose --cookie "cookie.txt" --cookie-jar "cookie.txt" https://services.indiald.com/eu/writelog.asp \
	-H 'authority: services.indiald.com' \
	-H 'cache-control: max-age=0' \
	-H 'upgrade-insecure-requests: 1' \
	-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3928.0 Safari/537.36' \
	-H 'sec-fetch-user: ?1' \
	-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' \
	-H 'sec-fetch-site: same-origin' \
	-H 'sec-fetch-mode: navigate' \
	-H 'referer: https://services.indiald.com/eu/default.asp' \
	-H 'accept-encoding: gzip, deflate, br' \
	-H 'accept-language: en-US,en;q=0.9' \
	--compressed

echo && echo "sup:4"

curl --verbose --cookie "cookie.txt" --cookie-jar "cookie.txt" https://services.indiald.com/eu/home.asp \
	-H 'authority: services.indiald.com' \
	-H 'cache-control: max-age=0' \
	-H 'upgrade-insecure-requests: 1' \
	-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3928.0 Safari/537.36' \
	-H 'sec-fetch-user: ?1' \
	-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' \
	-H 'sec-fetch-site: same-origin' \
	-H 'sec-fetch-mode: navigate' \
	-H 'referer: https://services.indiald.com/eu/default.asp' \
	-H 'accept-encoding: gzip, deflate, br' \
	-H 'accept-language: en-US,en;q=0.9' \
	--compressed


echo && echo "sup:5"

curl --verbose --cookie "cookie.txt" --cookie-jar "cookie.txt" https://services.indiald.com/eu/__z_services.asp?mode=customer_status\&customer=3670769222 \
	-H 'authority: services.indiald.com' \
	-H 'accept: text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01' \
	-H 'x-requested-with: XMLHttpRequest' \
	-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3928.0 Safari/537.36' \
	-H 'sec-fetch-site: same-origin' \
	-H 'sec-fetch-mode: cors' \
	-H 'referer: https://services.indiald.com/eu/home.asp' \
	-H 'accept-encoding: gzip, deflate, br' \
	-H 'accept-language: en-US,en;q=0.9' \
	--compressed

echo && echo "sup:6"

curl --verbose --cookie "cookie.txt" --cookie-jar "cookie.txt" https://services.indiald.com/eu/__z_services.asp?mode=customer_status_ext\&customer=3670769222 \
	-H 'authority: services.indiald.com' \
	-H 'accept: text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01' \
	-H 'x-requested-with: XMLHttpRequest' \
	-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3928.0 Safari/537.36' \
	-H 'sec-fetch-site: same-origin' \
	-H 'sec-fetch-mode: cors' \
	-H 'referer: https://services.indiald.com/eu/home.asp' \
	-H 'accept-encoding: gzip, deflate, br' \
	-H 'accept-language: en-US,en;q=0.9' \
	--compressed

echo && echo "sup:7"




















