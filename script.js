var width = 10;
var solvedArray = [[]];
var unsolvedArray = [[]];
var bombNumber = 0;
var flagNumber = 0;

function generateUnsolvedArray() { //Cette fonction genere le tableau
 affiche.innerHTML = ""
  var columm = 0
  var row = 0

  for (let i = 0; i < width; i++) {//On génère chaque bouton un à la fois et apres 10 bouton je saute une ligne
    columm = 0; //La valeur des boutons est egale au valeur dans le unsolvedArray alors le premier est egale a unsolvedArray[0][0]
    unsolvedArray.push([]);
    for (let j = 0; j < width; j++) {
      unsolvedArray[i].push("  "); //On ajoute des valeurs libre sinon il a une erreur
      affiche.innerHTML = affiche.innerHTML + '<input type="button" id="button" onmousedown="flag(event,'+row+','+columm+')" oncontextmenu="return false;" class="button" style="height:30px;width:30px" onclick="revele('+row+","+columm+')" value="'+ unsolvedArray[i][j] +'">';
      columm++
    }
  affiche.innerHTML = affiche.innerHTML + "<br>"
  row++
  }
  bombAffiche.innerHTML = '<p>Mines: ' + (bombNumber - flagNumber) + '</p>'
}

function generateSolvedArray(dif) {
  var max = 9 + dif
  var min = 7 + dif
  bombNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  bombAffiche.innerHTML = '<p>Mines: ' + bombNumber + '</p>' //On affiche le nombre de bombes

  for (let i = 0; i < width; i++) { //On crée notre solvedArray avec 100 variables vide
    solvedArray.push([]); 
    for (let j = 0; j < width; j++) {
      solvedArray[i].push(" ");
    }
  }

  for (let i = 0; i < bombNumber; i++) { //Ici j'ajoute les bombes dans le array aleatoirement
    var row = Math.round(Math.random()* (width-1)); 
    var columm = Math.round(Math.random()* (width-1));

    while(solvedArray[row][columm] === "💣") { //Si la case choisis est déja une bombe, choisir une autre
      columm = Math.round(Math.random()* (width-1)); 
      row = Math.round(Math.random()* (width-1));
    }
    solvedArray[row][columm] = "💣"; //Si la case est vide on lui place une bombe
  }
 
  for (let i = 0; i < width; i++) { //Ici on determine combien de bombes il a autour de chaque case
    for (let j = 0; j < width; j++) {
      var bombs = 0; //Je remet le compte de bombe a zero pour apres qu'on regarde une bombe
      if (solvedArray[i][j] != "💣") { //Je choisit seulement les cases sans bombes

      /*Pour trouver le nombre de bombe autour des case il faut en premier assurer que nous ne cherchons pas les cases qui n'existe pas par example on ne peut pas chercher la case du haut dans les cases de la premiere ligne et nous ne pouvons pas chercher la case du bas si notre premiere case est sur la derniere ligne alors*/

        if (i != width-1) { //Ici je m'asure que la case n'est pas dans la colone de gauche
          if (solvedArray[i][j+1] == "💣") { //ensuite je regarde la case de gauche et je check si elle est une bombe
            bombs++; //si oui je ajoute 1 a mon compte de bombe
          }
          if (i != 0) { //ici je m'asure que la case n'est pas une case du haut
            if (solvedArray[i-1][j+1] == "💣") { //parce que nous avons determiner que la case n'est pas du haut ou de la gauche nous regardons la case en diagonal pour voir si elle est une bombe
              bombs++; //si our je ajoute 1 au compte de bombe
            } //Je repete ce procet pour chaque case qui suit jusqu'attend que les huit case autour on ete regarder
          }
          if (i != width-1) {
            if (solvedArray[i+1][j+1] == "💣") {
              bombs++;
            }
          }
        }

        if (j != 0) {
          if (solvedArray[i][j-1] == "💣") {
            bombs++;
          }
          if (i != 0) {
            if (solvedArray[i-1][j-1] == "💣") {
              bombs++;
            }
          }
          if (i != width-1) {
            if (solvedArray[i+1][j-1] == "💣") {
              bombs++;
            }
          }
        }

        if (i != 0) {
          if (solvedArray[i-1][j] == "💣") {
            bombs++;
          }
        }

        if (i != width-1) {
          if (solvedArray[i+1][j] == "💣") {
            bombs++;
          }
        }
        solvedArray[i][j] = bombs; //ensuite je assigne la valeur de la case au nombre de bombe autour d'elles

      }
    }
  }
}
// Nettoie les valeurs des pour laisser place à d'autre
function cleanArray() {
  solvedArray = [];
  unsolvedArray = [];
  flagNumber = 0;
}

function flag(event, row, columm) { //Cette fonction active lors d'un clic droite de la souris
  if (event.button === 2) {
    if (unsolvedArray[row][columm] === "  ") {//si la case est libre je lui ajoute un drapeau
        unsolvedArray[row][columm] = "🚩"
        flagNumber++
      } else if (unsolvedArray[row][columm] == "🚩") { //si la case a deja un drapeau je enleve le drapeau
        unsolvedArray[row][columm] = "  "
        flagNumber = flagNumber - 1
      }
      generateUnsolvedArray()
    }
  }


function revele(row, columm) { //cette fonction active lorsque tu clic sur une case
  if (unsolvedArray[row][columm] === "  ") { //si la case est vide

    if (solvedArray[row][columm] == "💣") { //si la case est une bombe tu pers le jeux :(
      unsolvedArray = solvedArray
      generateUnsolvedArray()
      affiche.innerHTML = affiche.innerHTML + '<h3>BOOM! Vous avez explosé!</h3>';
      return;
    }

    unsolvedArray[row][columm] = solvedArray[row][columm] //j'assigne la valeur du solvedArray dans mon unsolvedArray
    reveleZero(row, columm) //je active cette fonction
    generateUnsolvedArray() //je revele la valeur

    
    /*cette partie determine si tu gagne. Si le nombre de nombre dans mon array est egale au nombre d'espace dans mon array-le nombre de bombe ceci veux dire que le joueur a revele toute les case sauf les bombes qui veux dire qu'il gagne*/
    var caseRevele = 0
    var win = (width*width) - bombNumber

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        if (typeof(unsolvedArray[i][j]) == 'number') { //je verifie si la case a un bombre
          caseRevele++
          if (caseRevele == win) {
            affiche.innerHTML = affiche.innerHTML + '<h3>BRAVO! Vous avez gagné!</h3>';
          }
        }
      }
    }

  }
}
   

//Cette fonction est la plus compliquer de toute les fonctions si la case que tu revele est un zero elle vas revele toute les case autour car il ne sont 100% pas des bombre mais si la case que tu revele est un zero on doit repeter le proces mais seulement avec les case non revele. On dois aussi pas revele les case qui n'existe pas comme plutot 
function reveleZero(row, columm) { 
  if (solvedArray[row][columm] == 0) { //je m'assure que le nombre est zero

    if (columm != width-1) { //je m'assure que la case choisit n'est pas une des cases de gauche
      if (unsolvedArray[row][columm+1] == "  ") { //si la case est vide
        unsolvedArray[row][columm+1] = solvedArray[row][columm+1] //j'assigne la valeur de cette case dans mon nsolveArray au olvedArray
        if (unsolvedArray[row][columm+1] == 0) { //Voici la partie interescente. Si la case est une zero repete la fonction mais avec la case de gauches
          reveleZero(row, columm+1);
        }
      }
    } 
    //Je repete se procet avec chaque case autour  en m'assurant que la case que je cherche existe
    if (columm != width-1 && row != width-1) {
      if (unsolvedArray[row+1][columm+1] === "  ") {
        unsolvedArray[row+1][columm+1] = solvedArray[row+1][columm+1] //sud est
        if (unsolvedArray[row+1][columm+1] == 0) {
          reveleZero(row+1, columm+1);
        }
      }
    }
    if (row != width-1) {
      if (unsolvedArray[row+1][columm] === "  ") {
        unsolvedArray[row+1][columm] = solvedArray[row+1][columm] //sud
        if (unsolvedArray[row+1][columm] == 0) {
          reveleZero(row+1, columm);
        }
      }
    }
    if (row != width-1 && columm != 0) {
      if (unsolvedArray[row+1][columm-1] === "  ") {
        unsolvedArray[row+1][columm-1] = solvedArray[row+1][columm-1] //sud west
        if (unsolvedArray[row+1][columm-1] == 0) {
          reveleZero(row+1, columm-1)
        }
      }
    }
    if (columm != 0) {
      if (unsolvedArray[row][columm-1] === "  ") {
        unsolvedArray[row][columm-1] = solvedArray[row][columm-1] //west
         if (unsolvedArray[row][columm-1] == 0) {
           reveleZero(row, columm-1)
         }
      }
    }
    if (columm != 0 && row != 0) {
      if (unsolvedArray[row-1][columm-1] === "  ") {
        unsolvedArray[row-1][columm-1] = solvedArray[row-1][columm-1] //nord west
        if (unsolvedArray[row-1][columm-1] == 0) {
          reveleZero(row-1, columm-1)
        }
      } 
    }
    if (row != 0) {
      if (unsolvedArray[row-1][columm] === "  ") {
        unsolvedArray[row-1][columm] = solvedArray[row-1][columm] //nord
        if (unsolvedArray[row-1][columm] == 0) {
          reveleZero(row-1, columm)
        }
      }
    }
    if (row != 0 && columm != width-1) {
      if (unsolvedArray[row-1][columm+1] === "  ") {
        unsolvedArray[row-1][columm+1] = solvedArray[row-1][columm+1] //nord est
        if (unsolvedArray[row-1][columm+1] == 0) {
          reveleZero(row-1, columm+1)
        }
      }
    }
  }
}

function hide() { // Cache les éléments visibles et vice-versa
  document.getElementById('difficulte').hidden = !document.getElementById('difficulte').hidden
  document.getElementById('jeux').hidden = !document.getElementById('jeux').hidden
}
