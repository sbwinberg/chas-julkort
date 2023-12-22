const maxSnowflakes = 100;
const snowColors = ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.7)"];
const snowflakeIcons = ["*", "❆", "❅", "❄"];
let sinkSpeed = 1.2;
const maxSnowflakeSize = 30;
const minSnowflakeSize = 8;

// Variabler för att lagra snöflingornas egenskaper och positioner
let snowflakes = [];
let marginBottom, marginRight;
let coordinates = [];
let leftRightMovements = [];
let xMovements = [];

// Skapa snöflingor när sidan laddas
for (let i = 0; i <= maxSnowflakes; i++) {
    // Skapa HTML element för varje snöflinga
  document.write(`
    <span id='snowflake${i}' class='snowflake' style='pointer-events:none;z-index:9999;position:fixed;top:-${maxSnowflakeSize}px'>
      ${snowflakeIcons[generateRandomIndex(snowflakeIcons.length)]}
    </span>
  `);
}

// Hantera event
window.onload = () => {
    // Starta snöfallsanimationen och hantera skärmstorleken
  startSnowfall();
  handleResize();
};

window.onresize = handleResize;

// Funktion för att generera ett random nummer
function generateRandomIndex(max) {
  return Math.floor(max * Math.random());
}

// Hantera ändring av skärmens storlek för att justera snöflingornas positon och göra dem responsiva
function handleResize() {
    // Uppdatera margin baserat på nuvarande skärmstorlek
  marginBottom = document.body.scrollHeight;
  marginRight = window.innerWidth - 15;

  // Flytta snöflingorna baserat på skärmstorlek
  for (let i = 0; i <= maxSnowflakes; i++) {
    snowflakes[i].posX = Math.random() * marginRight;
    snowflakes[i].posY = Math.random() * marginBottom;
    snowflakes[i].style.left = `${snowflakes[i].posX}px`;
    snowflakes[i].style.top = `${snowflakes[i].posY}px`;
  }
}

// Starta snöanimationen
function startSnowfall() {
    // Bestäm första margin dimensionerna
  marginBottom = document.body.scrollHeight;
  marginRight = window.innerWidth - 15;
  // Räkna ut rangen för snöflingornas storlek
  const sizeDifference = maxSnowflakeSize - minSnowflakeSize;

  // Starta varje snöflinga
  for (let i = 0; i <= maxSnowflakes; i++) {
    coordinates[i] = 0;
    leftRightMovements[i] = Math.random();
    xMovements[i] = 0.03 + Math.random() / 10;
    // Hämta HTML element för varje snöflinga
    snowflakes[i] = document.getElementById(`snowflake${i}`);
    // Storlek, färg och startposition för varje snöflinga
    snowflakes[i].size = generateRandomIndex(sizeDifference) + minSnowflakeSize;
    snowflakes[i].style.fontSize = `${snowflakes[i].size}px`;
    snowflakes[i].style.color = snowColors[generateRandomIndex(snowColors.length)];
    snowflakes[i].sink = sinkSpeed * snowflakes[i].size / 5;
    snowflakes[i].posX = Math.random() * marginRight;
    snowflakes[i].posY = Math.random() * marginBottom;
    snowflakes[i].style.left = `${snowflakes[i].posX}px`;
    snowflakes[i].style.top = `${snowflakes[i].posY}px`;
  }

  // Kalla på animationen
  moveSnowflakes();
}

// Flytta snöflingorna
function moveSnowflakes() {
    // Uppdatera position för varje snöflinga
  for (let i = 0; i <= maxSnowflakes; i++) {
    coordinates[i] += xMovements[i];
    snowflakes[i].posY += snowflakes[i].sink;
    snowflakes[i].style.left = `${snowflakes[i].posX + leftRightMovements[i] * Math.sin(coordinates[i])}px`;
    snowflakes[i].style.top = `${snowflakes[i].posY}px`;

    // Återställ snöflingans position om den når botten av sidan eller hamnar utanför
    if (snowflakes[i].posY >= marginBottom - snowflakes[i].size || parseInt(snowflakes[i].style.left) > marginRight - snowflakes[i].size) {
      snowflakes[i].posX = Math.random() * marginRight;
      snowflakes[i].posY = 0;
    }
  }

  // Kalla på moveSnowflakes med en fördröjning på animationen
  setTimeout(moveSnowflakes, 50);
}

/* // Gör så att snön faller snabbare när musen är på övre delen av skärmen
document.addEventListener('mousemove', function (event) {
    const upperHalf = document.body.clientHeight / 2;
    const cursorPosition = event.clientY;

    if (cursorPosition > upperHalf) {
        setTimeout(moveSnowflakes, 20);
    } else {
        clearTimeout;
        setTimeout(moveSnowflakes, 50);
    }
});*/