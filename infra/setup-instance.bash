#!/bin/bash

set -a

ENV_FILE="/home/user/simple-infra/.env" #colocar o path para sua env

if [ -f "$ENV_FILE" ]; then
	source "$ENV_FILE"
else
	echo "Arquivo .env não encontrado!"
	exit 1
fi

set +a

scp -i "$PEM_KEY_PATH" -r "/home/user/simple-infra/myservice" "$REMOTE_USER@$REMOTE_HOST":/home/ubuntu

ssh -i "$PEM_KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" <<EOF
sudo apt-get update -y && \
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update -y && \
sudo apt-get install -y docker-ce docker-ce-cli containerd.io && \
docker --version && \

if id "ubuntu" &>/dev/null; then
sudo usermod -aG docker ubuntu
fi

sudo curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
docker-compose --version && \

# reiniciar o terminal para aplicar as modificações do docker *AJUSTAR CODIGO*
sleep 5

sudo chmod +x /home/ubuntu/myservice/scripts/updateips.bash && \
(sudo crontab -l 2>/dev/null; cat /home/ubuntu/myservice/scripts/crontab_updateips) | sudo crontab - && \
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin && \
docker-compose -f /home/ubuntu/myservice/compose/docker-compose.yml up -d && \
sudo /home/ubuntu/myservice/scripts/updateips.bash
EOF
