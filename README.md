# Exo api justify
## Description
rien pour l'instant

## Lien temporairement disponible


## fichier .env
```
PORT=8080
MYSQL_HOST=localhost
MYSQL_USER=username
MYSQL_PW=password
MYSQL_DB=exo_api_justify
JWT_SECRET=secret
WORD_LIMIT=80000
```

## Documentation
### Avoir un token
POST /api/token
* Parametre
```json
{"email" : "email@exemple.com"}
```
* retourn un token jwt

### Justifier du texte
POST /api/token
* Parametre
```json
{
    "text" : "du text a justifier",
    "token" : "un token jwt valide"
}
```
* retourn le texte justifier