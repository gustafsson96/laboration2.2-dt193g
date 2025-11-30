# Laboration 2.2

## Översikt
Det här är en REST-webbtjänst som hanterar en filmdatabas. API:et är byggt med ramverket Hapi.js som server och PostgreSQL som databas och har stöd för full CRUD-funktionalitet. Validering sker med biblioteket Joi. 
<br><br>
Denna webbtjänst har skapats för laboration 2.2 i kursen "Fullstacksutveckling med ramverk" (DT193G).
<br><br>
Länk till det publicerade API:et: [Film-API](https://laboration2-2-dt193g.onrender.com/)


## Funktionalitet
* **Movie routes:** Routes som hanterar filmer. 
* **Full CRUD:** Läs in, skapa, uppdatera och radera filmer från databasen.
* **Validering med Joi:** Validera input med biblioteket Joi.
* **PostgreSQL:** En Postgres databas som lagrar filmerna. 

## Validering
* **POST och PUT:** POST- och PUT-förfrågningar valideras med Joi via payload-parametern för att säkerställa att samtliga fält är ifyllda och innehåller korrekt datatyp. 
* **DELETE:** DELETE-routen valideras med Joi via path-parametern `id` för att undvika felaktiga förfrågningar. 
* **Databasfel:** Eventuella databasfel fångas med try/catch och returnerar lämpliga statuskoder och felmeddelanden. 


## API Endpoints

Samtliga endpoints är publika och returnerar JSON.

| Metod     | End Point      | Beskrivning         |
|------------|----------------|---------------------|
| GET        | /          | Skriver ut välkomstmeddelande till skärmen  | 
| GET        | /movies          | Hämtar alla filmer  | 
| POST       | /movies          | Skapar en ny film  | 
| PUT        | /movies/:id      | Uppdaterar en film baserat på id | 
| DELETE     | /movies/:id      | Raderar en film baserat på id | 

## Installation

Säkerställ att node.js är installerat och följ dessa steg:

1. Klona repositoryt: git clone https://github.com/gustafsson96/laboration2.2-dt193g.git
2. Navigera in till projektmappen via kommandot: `cd ditt-projekts-namn`
3. Installera nödvändiga dependencies genom att köra kommandot: `npm install`
4. Skapa en .env-fil och lägg till variabler enligt följande struktur:
* DB_HOST=
* DB_PORT=
* DB_USER=
* DB_PASSWORD=
* DB_NAME=
5. Skapa databasen movies_db i PostgreSQL
6. Skapa tabellen 'movies' i databasen genom något av följande alternativ:
* Manuellt via PostgreSQL
* Automatiskt genom att köra `node install.js`
7. Starta servern med nodemon via kommandot: `npm run dev`

## Använda teknologier 
* Node.js
* Hapi.js
* PostgreSQL via paketet pg
* dotenv för att lagra variabler för databasanslutning
* Joi för validering

## Testning
API:ets endpoints kan testas via Postman eller liknande verktyg. För Postman: 
1. **GET** - Hämta alla filmer
* Öppna Postman och klicka på "New HTTP Request"
* Välj "GET" i dropdown-menyn
* Skriv in URL: https://laboration2-2-dt193g.onrender.com/movies 
* Klicka på "Send"

2. **POST** - Skapa en ny film 
* Öppna Postman och klicka på "New HTTP Request"
* Välj "POST" i dropdown-menyn
* Skriv in URL: https://laboration2-2-dt193g.onrender.com/movies
* Sätt header med Content-Type: application/json
* Välj body (raw JSON)
* Skapa ett film-objekt: <br> { "title": "str", "year": int, "genre": "str", "length": int, "watched": bool }
* Klicka på "Send"

3.  **PUT** - Uppdatera en film 
* Öppna Postman och klicka på "New HTTP Request"
* Välj "PUT" i dropdown-menyn
* Skriv in URL: https://laboration2-2-dt193g.onrender.com/movies/{id}
* Sätt header med Content-Type: application/json
* Välj body (raw JSON)
* Skapa ett film-objekt med uppdaterad information: <br> { "title": "str", "year": int, "genre": "str", "length": int, "watched": bool }
* Klicka på "Send"

4. **DELETE** - Radera en film
* Öppna Postman och klicka på "New HTTP Request"
* Välj "DELETE" i dropdown-menyn
* Skriv in URL: https://laboration2-2-dt193g.onrender.com/movies/{id}
* Klicka på "Send"

<br><br>
*Skapad av: Julia Gustafsson (jugu2402)*
<br>
*HT 2025*


