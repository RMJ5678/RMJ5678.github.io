function calcule() {
  var prix = parseFloat(document.getElementById("priceOfItem").value);
  var Qt = parseInt(document.getElementById("quantity").value);
  var affiche1 = document.getElementById("affiche1");
  var affiche2 = document.getElementById("affiche2");
  var affiche3 = document.getElementById("affiche3");
  var affiche4 = document.getElementById("affiche4");
 
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
  
  calculeTax()
  calculeCout()

  message1 = "Prix par item: " + prix.toFixed(2) + "$"
  message2 = "Quantite: " + Qt
  message3 = "Tax total: " + tax.toFixed(2) + "$" 
  message4 = "Prix total: " + cout.toFixed(2) + "$"

  affiche1.innerHTML = message1
  affiche2.innerHTML = message2
  affiche3.innerHTML = message3
  affiche4.innerHTML = message4
}
