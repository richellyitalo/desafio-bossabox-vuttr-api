# VUTTR (Very Useful Tools to Remember)

# Detalhes do desafio

Sua tarefa é construir uma API e banco de dados para a aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. Utilize um repositório Git (público, de preferência) para versionamento e disponibilização do código.

A aplicação pode ser construída utilizando qualquer linguagem, banco de dados, frameworks, libraries e ferramentas de sua preferência (Ex: Node + Express + Mongoose + MongoDB, PHP + Lumen + RedBean + PostgreSQL, etc). Apesar disso, a stack mais comum para squads aqui na BossaBox é Node.js, seguida por PHP. Ruby é incomum, mas aparece em raros casos.

A API deverá ser documentada utilizando o formato API Blueprint ou Swagger.

---

API de gerenciamento de ferramentas. Desenvolvido para o primeiro desafio na BossaBox.
Utilizei as seguites ferramentas:

* Express.js (Framework)
* Sequelize (ORM)
* JWT (Autenticação)
* API Blueprint (Documentação)
* Jest (Testes)

A aplicação é executada dentro do ambiente node.

# Configuração

## 1 - Instalação de pacotes
`npm install`

## 2 - Variáveis de ambiente
É necessário copiar as informações contidas no arquivo `.env.example` para um novo arquivo `.env` e alterar as configurações necessárias ou defini-las no ambiente. Como por exemplo `NODE_ENV` (production|development).

No arquivo `.env` há prefixos (DEV_, TEST_) relacionados às configurações de banco de dados para cada ambiente.

Para o ambiente de desenvolvimento (`NODE_ENV=development`), configure o arquivo .env ous as variáveis de ambiente para:

```
DEV_DB_CONNECTION   (tipo de conexão) [mysql|postgres|sqlite]
DEV_DB_HOST         (host)
DEV_DB_USER         (usuario do banco)
DEV_DB_PASS         (senha do banco)
DEV_DB_NAME         (nome do banco)
DEV_DB_STORAGE      (necessário apenas para quando DB_CONNECTION for 'sqlite')
```


## 3 - Migrations
Para criar a estrutura inicial de banco de dados é necessário executar o script.

`npm run migrate`


##  4 - Iniciando a aplicação (ambiente de desenvolvimento)
`npm run dev`


## 5 - Testes
O comando de testes já está configurado para executar consigo as migrations e posteriormente os testes.

**Pré-requisito:** é necessário definir as configurações (arquivo .env com prefixo `TEST_`) de banco relacionados a esse ambiente.
```
TEST_DB_CONNECTION (tipo de conexão) [mysql|postgres|sqlite]
TEST_DB_HOST        (host)
TEST_DB_USER        (usuário do banco)
TEST_DB_PASS        (senha do banco)
TEST_DB_NAME        (nome do banco)
TEST_DB_STORAGE     (necessário apenas para quando DB_CONNECTION for 'sqlite')
```

`npm run test`

---

# Deploy da aplicação
## Heroku

## 1 - Variáveis de ambiente necessárias
Para publicação é necessário definir as variáveis de ambiente.
```
# Obrigatorias
NODE_ENV        (ambiente) [production|development]
DB_CONNECTION   (tipo de conexão) [mysql|postgres|sqlite]
DB_HOST         (host)
DB_USER         (usuário do banco)
DB_PASS         (senha do banco)
DB_NAME         (nome do banco)
DB_STORAGE      (necessário apenas para quando DB_CONNECTION for 'sqlite')

# Opcionais
AUTH_SECRET     (combinação de encriptação das senhas jwt)
```

## 2 - Arquivo Procfile
Para auxiliar na publicação no Heroku, há uma arquivo `Procfile` com as seguintes instruções:
```
web: npm start
release: npm run migrate
```

Se ocorrer algum problema, as mesmas podem ser executadas manualmente.

### Ajudas externas
Para informações mais detalhadas de como publicar no Heroku, acesse [https://devcenter.heroku.com/articles/git](https://devcenter.heroku.com/articles/git).

---

## BONUS

A documentação da api se encontra no arquivo `api.html` ou através do link da na página inicial da api quando em funcionamento (o source em api.apib).


## API em Produção

Para os que desejam conferir a API antes de realizar a instalação, fiz a publicação da mesma para o Heroku. Ela pode ser acessada através do endereço **[https://vuttr-richellyitalo.herokuapp.com/](https://vuttr-richellyitalo.herokuapp.com/)**
