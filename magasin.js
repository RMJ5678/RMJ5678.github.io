//----------------------------------------------
alert("Tu va au magasin pour acheter un item.")
 
var prix = parseFloat(prompt("Le prix de l'item est _.__$"))
var Qt = parseInt(prompt("Combien de cette item?"))
 
var tax = (0)
function calculeTax(){
 tax = ((prix * Qt) * 0.13)
 tax = parseFloat(tax.toFixed(2))
 return tax
}
 
var cout = (0)
function calculeCout(){
 cout = (prix * Qt + tax)
 cout = parseFloat(cout.toFixed(2))
 return cout
}
 
//commande
console.log("Prix par item: " + prix + "$")
console.log("Quantité: " + Qt)
calculeTax()
console.log("Tax total: " + tax + "$")
calculeCout()
console.log("Prix total: " + cout + "$")
