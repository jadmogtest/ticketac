console.log('test');

let trajet = document.getElementsByClassName('trajet');
let date = document.getElementsByClassName('date');
let depart = document.getElementsByClassName('depart');
let prix = document.getElementsByClassName('prix');
let total = document.getElementById('total');
let recapitulatif = '';

function alertfunc() {

  for (let i = 0; i < trajet.length; i++) {
    recapitulatif += 'Trajet: ' + trajet[i].textContent + ' Date: ' + date[i].textContent + ' départ: ' + depart[i].textContent + '\n';
  }
  recapitulatif += 'Prix total: ' + total.textContent;
  alert(recapitulatif);
}