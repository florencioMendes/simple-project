#!/bin/bash

cd "$(dirname "$0")"

curl -O https://ip-ranges.amazonaws.com/ip-ranges.json

python3 ./generate_ips.py

if [ $? -eq 0 ]; then
	echo "Arquivo nginx.conf atualizado. Reiniciando Nginx..."
	docker-compose -f /home/ubuntu/myservice/compose/docker-compose.yml restart reverse-proxy
	echo "Serviço Nginx reiniciado com sucesso!"
	rm ip-ranges.json
else
	echo "Erro ao executar o script generate_ips. O serviço Nginx não será reiniciado."
fi

