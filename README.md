# Configuração

## 1 - Execute a instalação dos pacotes
`npm install`

## 2 - Configurações
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


## 3 - Migration da aplicação
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
TEST_DB_USER        (usuario do banco)
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
DB_USER         (usuario do banco)
DB_PASS         (senha do banco)
DB_NAME         (nome do banco)
DEV_DB_STORAGE  (necessário apenas para quando DB_CONNECTION for 'sqlite')

# Opcionais
AUTH_SECRET   (combinação de encriptacao das senhas jwt)
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

A documentação da api se encontra no arquivo `api.html` (o source em api.apib).
