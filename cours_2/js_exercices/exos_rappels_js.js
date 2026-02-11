// ============================================================================
// TP JAVASCRIPT - RAPPELS POUR REACT
// ============================================================================

console.log("=== TP JAVASCRIPT - EXERCICES 1 À 8 ===\n");

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Car from './Car.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. LECTURE ET MANIPULATION DE FICHIERS JSON
// ============================================================================
// Énoncé : Lisez le fichier JSON 'voitures.json' et affichez son contenu
// sous différentes formes (raw, parsé, stringifié). 
// Pour cela vous pourrez utiliser la méthode readFileSync du module fs de Node,
// et l'objet JSON natifs à Javascript : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON

console.log("=== 1. Lecture et manipulation de fichiers JSON ===");



const rawData = fs.readFileSync(path.join(__dirname, 'voitures.json'), 'utf8');
console.log("--- Contenu brut (String) ---");
console.log(rawData);

const carsData = JSON.parse(rawData);
console.log("\n--- Contenu parsé (Objet JS) ---");
console.log(carsData);

const stringifiedData = JSON.stringify(carsData, null, 2);
console.log("\n--- Contenu stringifié (JSON) ---");
console.log(stringifiedData);

// ============================================================================
// 2. CRÉATION ET IMPORT DE CLASSE
// ============================================================================
// Énoncé : Créez une classe Car dans un fichier séparé (Car.js). 
// Cette classe devra avoir la meme structure que les objets présents dans voitures.json. 
// Elle devra obligatoirement contenir les paramètres : 
// id, modelName, ownerFirstName, ownerLastName, age et topSpeed.
// age et topSpeed pourront avoir des valeurs par défaut de 0.
// Définissez une méthode permettant d'afficher de manière lisible les atributs d'un objet de type Car.
// Ensuite ajouter une méthode statique pour décrire à quoi sert l'objet Car. 
// Enfin importez-la et instanciez-la pour constater que tout fonctionne.

console.log("\n=== 2. Création et import de classe ===");

const myCar = new Car(1, "McLaren F1", "Gordon", "Murray", 75, 391);
myCar.printEssentialCarInfos();

Car.sayHello();


// ============================================================================
// 3. TRANSFORMATION DE DONNÉES
// ============================================================================
// Énoncé : À partir des données du JSON, créez un tableau d'instances de Car

console.log("\n=== 3. Transformation de données ===");

const cars = carsData.map(carData => {
    return new Car(
        carData.id,
        carData.modele.nom,
        carData.proprietaire.prenom,
        carData.proprietaire.nom,
        carData.proprietaire.age,
        carData.modele.vitesse_de_pointe_kmH
    );
});

console.log("Nombre de voitures créées :", cars.length);
cars.forEach(car => car.printEssentialCarInfos());

// ============================================================================
// 4. UTILISATION DES MÉTHODES DE TABLEAUX
// ============================================================================
// Énoncé : Utilisez différentes méthodes sur les tableaux
// pour effectuer des opérations sur les données des voitures

console.log("\n=== 4. Utilisation des méthodes de tableaux ===");

// 4.1. Afficher les informations de chaque voiture de votre tableaux de voitures
console.log("--- 4.1. Infos voitures ---");
cars.forEach(car => car.printEssentialCarInfos());

// 4.2. Récupérer dans le tableau la voiture du modèle Clio
console.log("\n--- 4.2. Recherche Clio ---");
const clio = cars.find(car => car.model.name === "Clio");
if (clio) console.log("Voiture trouvée :", clio.model.name);

// 4.3. Calculer la somme des ages disponibles des propriétaires
console.log("\n--- 4.3. Somme des âges ---");
const totalAge = cars.reduce((acc, car) => acc + (car.owner.age || 0), 0);
console.log("Somme des âges :", totalAge);

// 4.4. Calculer la vitesse de pointe moyenne sur toutes les voitures répertoriées
console.log("\n--- 4.4. Vitesse moyenne ---");
const avgSpeed = cars.reduce((acc, car) => acc + (car.model.topSpeed || 0), 0) / cars.length;
console.log("Vitesse moyenne :", avgSpeed.toFixed(2), "km/h");

// ============================================================================
// 5. DESTRUCTURATION
// ============================================================================
// Énoncé : Utilisez la destructuration pour extraire des valeurs de tableaux
// et d'objets.

console.log("\n=== 5. Destructuration ===");

// 5.1. 
// On veut abandonner la représentation par tableau qui n'est pas forcément pratique
// On va destructurer le tableau en 3 objets cars distincts : clioCar, alpineCar et ferrariCar
console.log("--- 5.1. Destructuration tableau ---");
const [clioCar, alpineCar, ferrariCar] = cars;
console.log("Clio extraite :", clioCar?.model.name);
console.log("Alpine extraite :", alpineCar?.model.name);
console.log("Ferrari extraite :", ferrariCar?.model.name);


// 5.2. De même pour une manipulation plus simple nous voulons avoir à disposition, 
// le prénom, nom et l'âge du conducteur de la Alpine directement sous forme de variable.
console.log("\n--- 5.2. Destructuration objet imbriqué ---");
const { owner: { firstName: alpineDriverName, lastName: alpineDriverLastName, age: alpineDriverAge } } = alpineCar;
console.log(`Conducteur Alpine : ${alpineDriverName} ${alpineDriverLastName}, ${alpineDriverAge} ans`);


// 5.3. Je souhaiterais avoir une fonction qui simplement prend un objet owner et m'affiche ses informations.
// Je dois être capable dans cette fonction de pouvoir manipuler les différents champs de l'objet, 
// sans faire appel à l'objet initial.
console.log("\n--- 5.3. Destructuration paramètre fonction (Owner) ---");
const displayOwnerInfo = ({ firstName, lastName, age }) => {
    console.log(`Owner info: ${firstName} ${lastName} (${age || 'N/A'} ans)`);
};
if (clioCar) displayOwnerInfo(clioCar.owner);


// 5.4. Similaire à la précédente question je voudrais avoir une fonction qui me permette de 
// manipuler toutes les informations d'une voiture sans avoir besoin de faire appel à l'objet passé.
// Vous pouvez prendre l'exemple de la voiture 103 et afficher ses informations sans appeler l'objet d'origine.
console.log("\n--- 5.4. Destructuration paramètre fonction (Car complet) ---");
const displayCarDetails = ({ model: { name, topSpeed }, owner: { firstName } }) => {
    console.log(`Voiture : ${name} (${topSpeed} km/h), Appartient à : ${firstName}`);
};
if (ferrariCar) displayCarDetails(ferrariCar);


// ============================================================================
// 6. SPREAD OPERATOR
// ============================================================================
// Énoncé : Comprenez la différence entre l'assignation par référence et 
// la copie avec le spread operator sur les tableaux et objets

console.log("\n=== 6. Spread Operator ===");

// 6.1. Créez un nouveau tableau "voitures" et affectez lui le précédent tableau cars.
// Modifiez le tableau "voitures". Affichez ensuite le tableau voitures et cars, que constatez-vous ?
console.log("--- 6.1. Assignation par référence ---");
const voitures = cars;
voitures.push(new Car(999, "TestCar Reference", "Tester", "One", 20, 100));
console.log("Taille 'cars' (original) :", cars.length);
console.log("Taille 'voitures' (référence) :", voitures.length);
console.log("Note: Les deux tableaux ont été modifiés car c'est la même référence.");

// 6.2. Créez une copie d'une tablea cars disont "automobiles" mais cette fois-ci en 
// utilisant une manière qui me permettra d'avoir une copie distincte d'une tableau cars.
console.log("\n--- 6.2. Copie avec Spread Operator ---");
const automobiles = [...cars];
automobiles.push(new Car(888, "TestCar Spread", "Tester", "Two", 25, 120));
console.log("Taille 'cars' (original) :", cars.length);
console.log("Taille 'automobiles' (copie) :", automobiles.length);
console.log("Note: 'cars' n'a pas changé lors de l'ajout dans 'automobiles'.");

// ============================================================================
// 7. HIGHER ORDER FUNCTIONS ET FONCTIONS COMME VALEURS
// ============================================================================
// Énoncé : Explorez les fonctions en tant que valeurs de première classe,
// les fonctions anonymes, et les higher order functions

console.log("\n=== 7. Higher Order Functions et fonctions comme valeurs ===");

// 7.0. Créez une fonction anonyme et affectez la à une variable. Faites de même pour 
// une arrow function.
const myAnonymousFunction = function() {
    console.log("I am an anonymous function");
};
const myArrowFunction = () => {
    console.log("I am an arrow function");
};
myAnonymousFunction();
myArrowFunction();


// ============================================================================
// 7.1. HIGHER ORDER FUNCTION POUR FORMATER LES STRINGS
// ============================================================================
// Énoncé : Créer une fonction qui applique sur tous les champs de type string 
// du premier niveau d'un objet une potentielle méthode de formatage de string.
// Pour info : Object.entries(monObjet) retourne un array de paires [clé, valeur] 
// des propriétés énumérables d'un objet.

console.log("\n--- 7.1. Higher order function pour formater les strings :");
const formatStringProperties = (obj, formatFn) => {
    const newObj = { ...obj };
    for (const [key, value] of Object.entries(newObj)) {
        if (typeof value === 'string') {
            newObj[key] = formatFn(value);
        }
    }
    return newObj;
};


// ============================================================================
// 7.2. FONCTIONS DE TRANSFORMATION DE STRINGS
// ============================================================================
// Énoncé : Créer 2 fonctions permettant de prendre une string et de 
// transformer tous ses caractères en majuscule et une autre en minuscule.

console.log("\n--- 7.2. Fonctions de transformation :");
const toUpperCase = (str) => str.toUpperCase();
const toLowerCase = (str) => str.toLowerCase();

console.log("Test UPPER:", toUpperCase("hello"));


// ============================================================================
// 7.3. APPLICATION DE LA FONCTION DE FORMATAGE
// ============================================================================
// Énoncé : Utiliser maintenant votre précédente fonction pour appliquer 
// une transformation des strings à un sous-objet owner de la class Car. Vous pouvez 
// l'appliquer sur le propriétaire de la voiture Alpine par exemple. 

console.log("\n--- 7.3. Application de formatage sur un sous-objet :");
if (alpineCar) {
    const formattedOwner = formatStringProperties(alpineCar.owner, toUpperCase);
    console.log("Owner original:", alpineCar.owner);
    console.log("Owner formaté:", formattedOwner);
}


// ============================================================================
// 7.4. APPLICATION SUR UN OBJET COMPLET
// ============================================================================
// Énoncé : Appliquer maintenant cette fonction sur tout l'objet. 
// Essayez de trouver la manière la plus élégante/simple/réutilisable de le faire

console.log("\n--- 7.4. Application sur un objet complet (Deep) :");
const formatObjectDeep = (obj, formatFn) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    // Si c'est un tableau, on map
    if (Array.isArray(obj)) {
        return obj.map(item => formatObjectDeep(item, formatFn));
    }

    const newObj = { ...obj };
    for (const key in newObj) {
        if (typeof newObj[key] === 'string') {
            newObj[key] = formatFn(newObj[key]);
        } else if (typeof newObj[key] === 'object') {
            newObj[key] = formatObjectDeep(newObj[key], formatFn);
        }
    }
    return newObj;
};

if (alpineCar) {
    const fullyFormattedCar = formatObjectDeep(alpineCar, toUpperCase);
    console.log("Voiture complète formatée:", fullyFormattedCar);
}


// ============================================================================
// 8. GESTION DES ERREURS
// ============================================================================

console.log("\n=== EXERCICE 8 : GESTION DES ERREURS ===\n");

// ============================================================================
// 8.1. Try-Catch basique
// ============================================================================
// Énoncé : Créez une fonction parseCarData(jsonString) qui prend une chaîne 
// JSON et retourne l'objet parsé. Si le parsing échoue, la fonction doit 
// capturer l'erreur et retourner null tout en affichant un message d'erreur 
// dans la console.

console.log("--- 8.1. Try-Catch basique ---");

function parseCarData(jsonString) {
   try {
       const parsed = JSON.parse(jsonString);
       return parsed;
   } catch (error) {
       console.error("Erreur de parsing JSON:", error.message);
       return null;
   }
}

// Tests
const validJson = '{"modele": "Clio", "prix": 15000}';
const invalidJson = '{modele: "Clio", prix: 15000}'; // JSON invalide (manque guillemets)

console.log("Parsing JSON valide :", parseCarData(validJson));
console.log("Parsing JSON invalide :", parseCarData(invalidJson));

// ============================================================================
// 8.2. Erreurs personnalisées
// ============================================================================
// Énoncé : Créez une classe d'erreur personnalisée CarValidationError qui 
// étend Error. Ensuite, créez une fonction validateCar(car) qui vérifie 
// qu'un objet voiture possède bien les propriétés id, model et owner. 
// Si une propriété manque, lancez une CarValidationError avec un message explicite.

console.log("\n--- 8.2. Erreurs personnalisées ---");

// Classe d'erreur personnalisée
class CarValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "CarValidationError";
    }
} 

function validateCar(car) {
    if (!car.id) throw new CarValidationError("La voiture n'a pas d'ID");
    if (!car.model) throw new CarValidationError("La voiture n'a pas de modèle");
    if (!car.owner) throw new CarValidationError("La voiture n'a pas de propriétaire");
    return true;   
}

// Tests
const incompleteCar = { id: 1, model: { name: "Clio" } }; // manque owner
const completeCar = { id: 1, model: { name: "Clio" }, owner: { firstName: "Jean" } };

try {
    validateCar(incompleteCar);
    console.log("Voiture incomplète validée (ne devrait pas s'afficher)");
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

try {
    validateCar(completeCar);
    console.log("Voiture complète validée avec succès !");
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

// ============================================================================
// 8.3. Finally et nettoyage de ressources
// ============================================================================
// Énoncé : Créez une fonction loadCarsFromFile(filename) qui :
// - Ouvre et lit un fichier JSON de voitures
// - Parse les données
// - Gère les erreurs potentielles (fichier inexistant, JSON invalide)
// - Utilise finally pour afficher un message "Opération de lecture terminée" 
//   dans tous les cas

console.log("\n--- 8.3. Finally et nettoyage de ressources ---");

function loadCarsFromFile(filename) {
    try {
        const filePath = path.join(__dirname, filename);
        if(!fs.existsSync(filePath)) {
            throw new Error(`Le fichier ${filename} n'existe pas.`);
        }
        const data = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(data);
        console.log(`Fichier ${filename} lu et parsé avec succès. ${parsed.length} items.`);
        return parsed;
    } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error.message);
        return null;
    } finally {
        console.log("Opération de lecture terminée.");
    }
}

// Tests
loadCarsFromFile('voitures.json'); // Fichier existant
loadCarsFromFile('fichier_inexistant.json'); // Fichier inexistant

// ============================================================================
// 8.4. Propagation d'erreurs
// ============================================================================
// Énoncé : Créez une fonction calculateAverageSpeed(cars) qui :
// - Vérifie que le paramètre est bien un tableau (sinon lance une TypeError)
// - Calcule la vitesse moyenne des voitures
// - Si une voiture n'a pas de topSpeed défini, lance une erreur personnalisée 
//   MissingDataError
//
// Ensuite, créez une fonction safeCalculateAverageSpeed(cars) qui appelle 
// calculateAverageSpeed et gère toutes les erreurs possibles en retournant 
// un objet { success: boolean, result?: number, error?: string }.

console.log("\n--- 8.4. Propagation d'erreurs ---");

// Classe d'erreur pour données manquantes
class MissingDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingDataError";
    }
}

function calculateAverageSpeed(cars) {
    if (!Array.isArray(cars)) {
        throw new TypeError("Le paramètre doit être un tableau");
    }
    if (cars.length === 0) return 0;

    const totalSpeed = cars.reduce((acc, car) => {
        // Adaptation selon la structure de l'objet (instance Car vs objet brut)
        // Ici on suppose qu'on peut recevoir des objets bruts ou instances
        const speed = car.model?.topSpeed || car.model?.vitesse_de_pointe_kmH;
        
        if (speed === undefined || speed === null) {
            throw new MissingDataError(`Vitesse manquante pour la voiture ID ${car.id}`);
        }
        return acc + speed;
    }, 0);

    return totalSpeed / cars.length;
}

function safeCalculateAverageSpeed(cars) {
    try {
        const result = calculateAverageSpeed(cars);
        return { success: true, result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Exemple de tests (à décommenter)
console.log("Calcul avec données valides :", safeCalculateAverageSpeed(cars));
console.log("Calcul avec paramètre invalide :", safeCalculateAverageSpeed("pas un tableau"));
console.log("Calcul avec tableau vide :", safeCalculateAverageSpeed([]));

const carsWithMissingData = [
    cars[0],
    { id: 999, model: {}, owner: {} } // Voiture sans topSpeed
];
console.log("Calcul avec données manquantes :", safeCalculateAverageSpeed(carsWithMissingData));

// ============================================================================
// 8.6. Chaînage d'erreurs et contexte (bonus difficile)
// ============================================================================
// Énoncé : Créez une fonction processCarBatch(carDataArray) qui :
// - Prend un tableau de données brutes de voitures
// - Pour chaque voiture, tente de la valider puis de la transformer en instance de Car
// - Collecte toutes les erreurs rencontrées sans interrompre le traitement
// - Retourne un objet contenant les voitures réussies et les erreurs avec 
//   leur contexte (index, données originales, message d'erreur)

console.log("\n--- 8.6. Chaînage d'erreurs et contexte ---");

function processCarBatch(carDataArray) {
    const successful = [];
    const failed = [];

    carDataArray.forEach((data, index) => {
        try {
            // Validation basique
            if (!data || typeof data !== 'object') {
                throw new Error("Donnée invalide (attendu: objet)");
            }
            if (!data.id) throw new Error("ID manquant");
            
            // Adaptation des noms de champs (mapping) pour correspondre au constructeur Car
            // Le JSON a 'modele'/'proprietaire', la classe attend 'model'/'owner' via constructeur ou propriétés
            // Notre constructeur: constructor(id, modelName, ownerFirstName, ownerLastName, age, topSpeed)
            
            const modelName = data.modele?.nom || data.model?.name;
            if (!modelName) throw new Error("Nom du modèle manquant");

            const ownerFirstName = data.proprietaire?.prenom || data.owner?.firstName;
            const ownerLastName = data.proprietaire?.nom || data.owner?.lastName; // Peut être undefined selon les données
            
            // Si c'est strict on peut check, sinon on continue
            
            const car = new Car(
                data.id, 
                modelName, 
                ownerFirstName || "Inconnu", 
                ownerLastName || "", 
                data.proprietaire?.age || 0, 
                data.modele?.vitesse_de_pointe_kmH || 0
            );

            successful.push(car);

        } catch (error) {
            failed.push({
                index,
                data,
                error: error.message
            });
        }
    });

    return { successful, failed };
}

// Données de test avec plusieurs cas d'erreur
const batchData = [
    // Voiture valide
    {
        id: 1,
        modele: { nom: "Clio", vitesse_de_pointe_kmH: 180 },
        proprietaire: { prenom: "Jean", nom: "Dupont", age: 30 }
    },
    // Voiture sans ID
    {
        modele: { nom: "Alpine" },
        proprietaire: { prenom: "Marie", nom: "Martin" }
    },
    // Voiture sans modèle
    {
        id: 3,
        proprietaire: { prenom: "Pierre", nom: "Durand" }
    },
    // Données invalides (non-objet)
    "données invalides",
    // Voiture valide
    {
        id: 5,
        modele: { nom: "Ferrari", vitesse_de_pointe_kmH: 340 },
        proprietaire: { prenom: "Luc", nom: "Bernard", age: 45 }
    },
    // Voiture sans propriétaire (OK dans ma logique, mais on peut simuler erreur si besoin, ici ça passera car j'ai mis "Inconnu" par défaut)
    {
        id: 6,
        modele: { nom: "Porsche", vitesse_de_pointe_kmH: 310 }
    }
];

// Exemple de tests (à décommenter)

const result = processCarBatch(batchData);

console.log(`\n Voitures traitées avec succès : ${result.successful.length}`);
result.successful.forEach((car, i) => {
    console.log(`  ${i + 1}. ${car.model.name} (ID: ${car.id})`);
});

console.log(`\n Voitures en erreur : ${result.failed.length}`);
result.failed.forEach((failure) => {
    console.log(`  Index ${failure.index}: ${failure.error}`);
    console.log(`    Données : ${JSON.stringify(failure.data)}`);
});
