# Software security web applicatie Zico Van Ongeval


## Frontend applicatie

https://software-security.zaci.xyz/

## Backend api

https://api-software-security.zaci.xyz/


## Beheerder account

Email: zico.vanongeval10@gmail.com

Wachtwoord: In reactie canvas opdracht.

## Normaal account

Email: zicovo@live.be

Wachtwoord: In reactie canvas opdracht.

## Toegangscontrole policy

## Gewone gebruiker:

### Niet geauthenticeerde routes:

Kan alle producten oplijsten, zonder aangemeld te zijn.

GET: https://api-software-security.zaci.xyz/api/products

### Geauthenticeerde routes

POST: https://api-software-security.zaci.xyz/api/products

```json

{
        "name": "",
        "description": "",
        "price": 99.00,
        "img": "",
        "user_id": ""
}

```

Producten aangemaakt door de user opvragen

GET: https://api-software-security.zaci.xyz/api/products/:userId

Product aangemaakt door de user updaten:

PUT: https://api-software-security.zaci.xyz/api/products/:id

Product aangemaakt door de user verwijderen

DELETE: https://api-software-security.zaci.xyz/api/products/:id

De gebruiker kan geinitialiseerd worden 

POST: https://api-software-security.zaci.xyz/api/users/init

In de applicatie wordt de user bij registratie geinitialiseerd in de database met deze api endpoint. Als properties dienen de sub van auth0 als id, email en completedProfile: false meegegeven te worden.

Nadien wordt er via route guards afgedwongen dat de user zijn account moet updaten met naam en voornaam.

```json

{
 "id": "",
 "email": "",
 "completedProfile": false

}
```

PUT: https://api-software-security.zaci.xyz/api/users/:id

Checken of user account compleet is.

GET: https://api-software-security.zaci.xyz/api/users/isCompleted/:id

User account en bijhorende rollen opvragen.

GET: https://api-software-security.zaci.xyz/api/users/withRoles/:id

GDPR: Alle gebruikersdata opvragen.

GET: https://api-software-security.zaci.xyz/api/users/getAllUserData/:id



## Beheerder:

De beheerder kan ieders producten verwijderen.

DELETE: https://api-software-security.zaci.xyz/api/products/adminDelete/:id

De beheerder kan alle users opvragen.

GET:  https://api-software-security.zaci.xyz/api/users

De beheerder kan geen producten aanmaken of wijzigen.


## Verwerkings register



- Categorie persoonsgegeven(s): Naam
- Categorie persoonsgegeven(s): E-mailadres/telefoonnummer
- Categorie betrokkenen: Leden
- Grondslag voor de verwerking: Overeenkomst
- Doel verwerking: Dienstverlening
- Zelf verwerken: Ja
- Waar bevindt zich de verwerker? Niet van toepassing
- EU Verwerkingsovereenkomst? Niet van toepassing/Niet nodig
- Bewaartermijn: Onbekend (Tot de user account verwijdert)
- Veiligheidsmaatregelen: Anonimisering persoonsgegevens





## License
[MIT](https://choosealicense.com/licenses/mit/)