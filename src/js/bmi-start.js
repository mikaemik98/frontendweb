import '../css/style.css';
import '../css/bmi.css';
import '../css/mobile.css';

// Navigaation toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// Painoindeksitiedot
const lowBmi = `Jos painoindeksi on alle 18,5, se merkitsee liiallista laihuutta. Sen syynä voi olla jokin pitkällinen sairaus tai laihuushäiriö eli anoreksia. Jos varsinaista sairautta ei ole, mutta painoindeksi on laskenut alle 18,5:n, pitää hakeutua lääkäriin. Jos paino muutamassa kuukaudessa on laskenut yli 20:n tasolta reilusti, on varminta mennä lääkäriin jo painoindeksin lähestyessä 19:ää.`;

const normalBmi = `Normaaliksi on valittu se painoindeksin alue, jossa ihmisen terveys on parhaimmillaan. Normaali painoindeksin alue on välillä 18,5–25. Jos painoindeksi on pienempi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee. Painoindeksiä voidaan käyttää 18 vuoden iästä lähtien.`;

const highBmi = `Kun painoindeksi ylittää 25, ollaan liikapainon puolella. Liikakilojen määrä voi vaihdella erittäin paljon, muutamasta kilosta moniin kymmeniin kiloihin. Siksi on hyödyllistä täsmentää, kuinka suuresta ylipainosta on kyse.`;

// Haetaan DOM-elementit kerran

const bmiForm = document.querySelector('form');
const analysis = document.querySelector('.analysis');
// lisää muut

// Näytä analyysialueen  oletusviesti

// Painoindeksilaskuri
bmiForm.addEventListener('submit', (evt) => {
  console.log('Lasketaan painoindeksi');
  // Estä normaali formin lähettäminen
  evt.preventDefault();
  // Hae formin arvot
  const weightInput = document.getElementById('weight');
  const weight = Number(weightInput.value);
  const heightInput = document.getElementById('height');
  const height = Number(heightInput.value);
  console.log(`Paino: ${weightInput.value}, Pituus: ${heightInput.value}`);
  const sum = weight + height;
  console.log(sum);
  // yleensä UIsta saadaan aina lähtökohtaisesti string elementti
  // Number yrittää muuntaa merkkijonon numeroksi. Jos muunnos epäonnistuu, funktio palauttaa erityisen arvon NaN (Not-a-Number).

  resetBMIStyles();
  calculateBMI(weight, height);
});

// Tyylien nollaus
const resetBMIStyles = () => {
  // hae elementit ja poista classList remove tyylit
  analysis.innerHTML = '';
  document.querySelector('.bmi0-19').classList.remove('lowBmi');
  document.querySelector('.bmi19-25').classList.remove('normalBmi');
  document.querySelector('.bmi25-30').classList.remove('highBmi');
};

// BMI:n laskenta ja analyysin päivitys
const calculateBMI = (weight, height) => {
  const bmi = (weight / (height / 100) ** 2).toFixed(1);
  console.log('BMI', bmi);

  const mittaus = document.querySelector('.bmi-score');
  console.log(mittaus);
  mittaus.textContent = bmi;
  // näytä sivulla laskettu BMI arvo
  // tee pieni if/else jossa bmin mukaan
  if (bmi < 18.9) {
    document.querySelector('.bmi0-19').classList.add('lowBmi');
    analysis.textContent = lowBmi;
  } else if (bmi < 25) {
    document.querySelector('.bmi19-25').classList.add('normalBmi');
    analysis.textContent = normalBmi;
  } else {
    document.querySelector('.bmi25-30').classList.add('highBmi');
    analysis.textContent = highBmi;
  }
  // annat halutulle taulukon riville oikea teksti
  // sekä luokan joka värjää taustan
};
