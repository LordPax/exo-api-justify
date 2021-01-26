# Exo api justify
## Description
rien pour l'instant

## Lien temporairement disponible

## Installtion
```bash
git clone https://github.com/LordPax/exo-api-justify.git && cd exo-api-justify
npm install
npm start
```

## Fichier .env
```
PORT=8080
MYSQL_HOST=localhost
MYSQL_USER=username
MYSQL_PW=password
MYSQL_DB=exo_api_justify
JWT_SECRET=secret
WORD_LIMIT=80000
```

## Base de données
Penser à installer **bdd/exo_api_justify.sql** dans une version de mariadb à jour

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