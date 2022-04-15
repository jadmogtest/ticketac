console.log('allo');

function dateformat(date) {
  newDate = new Date(date);
  newDate.toLocaleDateString('fr-FR');
  return newDate;
}