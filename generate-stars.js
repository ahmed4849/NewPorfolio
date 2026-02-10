const fs = require('fs');

function generateBoxShadow(n) {
    let value = '';
    for (let i = 0; i < n; i++) {
        // Random x, y position within 2000px
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        value += `${x}px ${y}px #FFF, `;
    }
    return value.slice(0, -2);
}

const stars1 = generateBoxShadow(700);
const stars2 = generateBoxShadow(200);
const stars3 = generateBoxShadow(100);

const cssContent = `
/* Stars Animation */
#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${stars1};
  animation: animStar 50s linear infinite;
}

#stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${stars1};
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${stars2};
  animation: animStar 100s linear infinite;
}

#stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${stars2};
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${stars3};
  animation: animStar 150s linear infinite;
}

#stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${stars3};
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
`;

fs.writeFileSync('stars.css', cssContent);
console.log('stars.css generated');
