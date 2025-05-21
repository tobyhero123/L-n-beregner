<script>
  // Hent inputfelter
  const timerInput = document.getElementById("timer");
  const timelonInput = document.getElementById("timelon");
  const ambInput = document.getElementById("amb");
  const skatInput = document.getElementById("skat");
  const resultatDiv = document.getElementById("resultat");

  // Gem værdier
  function gemData() {
    localStorage.setItem("timer", timerInput.value);
    localStorage.setItem("timelon", timelonInput.value);
    localStorage.setItem("amb", ambInput.value);
    localStorage.setItem("skat", skatInput.value);
  }

  // Hent gemt data
  function hentData() {
    if (localStorage.getItem("timer")) timerInput.value = localStorage.getItem("timer");
    if (localStorage.getItem("timelon")) timelonInput.value = localStorage.getItem("timelon");
    if (localStorage.getItem("amb")) ambInput.value = localStorage.getItem("amb");
    if (localStorage.getItem("skat")) skatInput.value = localStorage.getItem("skat");
  }

  // Ved sides indlæsning
  window.addEventListener("DOMContentLoaded", hentData);

  // Beregn løn
 document.getElementById("beregn").addEventListener("click", function () {
  const timer = parseFloat(timerInput.value);
  const timelon = parseFloat(timelonInput.value);
  const amb = parseFloat(ambInput.value);
  const skat = parseFloat(skatInput.value);

  if (isNaN(timer) || isNaN(timelon)) {
    resultatDiv.textContent = "Indtast gyldige værdier for timer og timeløn.";
    return;
  }

  // Brug 0 hvis skat eller amb er tomt, men accepter 0 som gyldigt input
  const ambProcent = isNaN(amb) ? 8 : amb;
  const skatProcent = isNaN(skat) ? 37 : skat;

  const bruttolon = timer * timelon;
  const efterAMB = bruttolon * (1 - ambProcent / 100);
  const efterSkat = efterAMB * (1 - skatProcent / 100);

  resultatDiv.innerHTML = `
    Bruttoløn: ${bruttolon.toFixed(2)} kr.<br>
    Efter AM-bidrag (${ambProcent}%): ${efterAMB.toFixed(2)} kr.<br>
    Efter skat (${skatProcent}%): <strong>${efterSkat.toFixed(2)} kr.</strong>
  `;

  gemData();
});


  // Ryd alt-knap
  document.getElementById("ryd").addEventListener("click", function () {
    timerInput.value = "";
    timelonInput.value = "";
    ambInput.value = "";
    skatInput.value = "";
    resultatDiv.textContent = "";
    localStorage.removeItem("timer");
    localStorage.removeItem("timelon");
    localStorage.removeItem("amb");
    localStorage.removeItem("skat");
  });
</script>
