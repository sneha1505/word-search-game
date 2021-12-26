'use strict';

const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');
let letters;

let lives;

const words = new Map([
  ['test', 'you give in class'],
  ['hungry', 'when you crave'],
  ['love', 'it is a feeling'],
  ['shadow','Reflection'],
  ['homosapians','it is a species'],
]);
const word_list = [...words.keys()];
const getRandomWord = function (list)
 {
  return list[Math.floor(Math.random() * word_list.length)];
};
let select_word;

const init = function (state) {
  wordDiv.innerHTML = '';
  if (state === 'start') {
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
    }
  } else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
    });
  }
  select_word = getRandomWord(word_list);
  lives = 5;
  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
};
init('start');
const showNotif = function (msg) {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
};
const decreaseLife = function () {
  lives--;
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotif('lost');
  }
};
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  
  return indexes;
};
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }
  this.classList.add('disabled');
};
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});
hintButton.addEventListener('click', function () {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});
resetButton.addEventListener('click', function () {
  init('reset');
});
playAgain.addEventListener('click', function () {
  init('reset');
});