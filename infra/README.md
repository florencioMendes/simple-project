# Infra AWS

Repositório de versionamento para a infraestrutura no serviço de cloud AWS.

O backend foi configurado para utilizar o bucket S3 e uam table da DynamoDB da AWS.

## Requisitos

- Instale terraform em sua máquina

- Crie uma pasta chama "keys" e armazene todas as keys-pars para conexões ssh nesta pasta.

- configure suas keys AWS no AWS CLI

## Inicializar projeto sem utilizar o Bucket S3

Para conseguir utilizar o repositório sem versionar nenhuma alteração na AWS, basta comentar o conteúdo do arquivo "backend.tf" e executar "terraform init" para reconfigurar as definições do backend, isso tornará seu versionamento local.

## Inicializar o projeto utilizando o Bucket S3 pela primeira vez

1° Comente todo o conteúdo do arquivo "backend.tf"

2° Comente todo o projeto no arquivo main, deixado apenas o modulo "backend" e o "provider"

3° Execute "terraform init" e em seguida "terraform apply"

4° Após criado os recursos necessários para o backend na AWS, descomente o conteúdo do arquivo "backend.tf"

5° Execute "terraform init"

Após esses passos, seus backend utilizando o bucket S3 e DynamoDB estará funcionando.

Obs:

- Comente todo o conteúdo do arquivo "outputs.tf" se necessário, pois pode acontecer erros devido a referência de módulos comentados.

##OBS
- O projeto não está concluido
- existe uma lógica de script na instancia que limita os acessos na mesma para aceitar apenas os ips do AWS API GATEWAY que ainda não implementei no terraform, so testei direto no console.
- apos criar a infra na aws, deve executar o shel setup-instace.bash 2x para configurar a instancia com seus servicos backend
- será criado uma infraestrutura básica com EC2, RDS, VPC e SECURITY GROUPS para conseguir subir um app no ar e integrar com banco de dados.