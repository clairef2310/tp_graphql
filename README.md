# tp_graphql

Il y a deux branches différentes, qui utilise graphql différemment. Une utilise Apollo server et l'autre Postman. 
Chaque package à installer sont dans le readme des branches

# Branche Apollo

Cette branche correspond à un fonctionnement de graphql avec Apollo.

Il faut installer :
  - express-graphql
  -  mongoose
  -  graphql
  -  express

Pour aller sur le serveur Apollo, il faut se mettre sur
````
http://localhost:4000/
````

## Create 

### Créer un étudiant : 

Root > Mutation > create(..) : Student et choisir tout les arguments, et rentrer les informations demandées.


## Update 

### Update un étudiant : 

Root > Mutation > update(..) : Student et choisir ID dans arguments ainsi que les arguments que l'on veut changer

````
655f812be24b2353fa8ff33e
````

## Delete 

### Supprimer un étudiant : 

Root > Mutation > delete(..) : Student et choisir ID dans arguments et mettre l'id de l'étudiant 

````
656062afb01efe288e8a7dc2
````

## Get 

### Récupérer tous les étudiants : 

Root > Query > student(..) : [Student] et tout sélectionner

### Récupérer un étudiants : 

Root > Query > student(..) : Student et choisir ID dans arguments et mettre l'id de l'étudiant 

````
655f812be24b2353fa8ff33e
````

## Base de données

La base de données s'appelle student-register et la collection est dans le dossier bdd

# Branche Postman

Cette branche correspond à un fonctionnement de graphql avec Postman.

il faut installer :

@apollo/server
graphql-tag
mongoose

Pour lancer l'application il faut faire : 
````
node index.js
````
