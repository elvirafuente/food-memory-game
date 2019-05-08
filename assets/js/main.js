'use strict';

let iconsArray = [
    {
        name: 'apple',
        image: 'fa-apple-alt',
    },
    {
        name: 'carrot',
        image: 'fa-carrot',
    },
    {
        name: 'leaf',
        image: 'fa-leaf',
    },
    {
        name: 'lemon',
        image: 'fa-lemon',
    },
    {
        name: 'pepper',
        image: 'fa-pepper-hot',
    },
    {
        name: 'candy',
        image: 'fa-candy-cane',
    },
    {
        name: 'hamburger',
        image: 'fa-hamburger',
    },
    {
        name: 'hotdog',
        image: 'fa-hotdog',
    },
    {
        name: 'ice-cream',
        image: 'fa-ice-cream',
    },
    {
        name: 'pizza',
        image: 'fa-pizza-slice',
    }
]

let cardsNumber;

let cardsValue = [];
let cardsValueArray = [];
let resultRandom;
let firstCard;
let secondCard;
let firstClicked = false;
let acc = 0;


//recoger
const inputs = document.querySelectorAll('.input');
const btnSubmit = document.querySelector('.btn__submit');
const cardsUl = document.querySelector('.cards__container');
const modal = document.querySelector('.modal__container');
const btnModal = document.querySelector('.modal__button');

modal.style.display = 'none';

function handlerClick(){
    resultRandom = [''];
    cardsUl.innerHTML = '';
    checkNumberOption();
    getRandomOrder()
    paintCards();
}

function checkNumberOption(){
    for(let i = 0; i< inputs.length;i++){
        if(inputs[i].checked){
            cardsNumber = inputs[i].value;    
        }
    }
    createNewArray(cardsNumber);
    cardsValueArray = cardsValue.concat(cardsValue);
}

function getRandomOrder(){
        resultRandom = cardsValueArray.sort(function(){
        return 0.5 - Math.random();
    });
    return resultRandom;
}

function paintCards(){
    for (let i = 0; i<resultRandom.length;i++){
            const cardEl = document.createElement('li');
            cardEl.classList.add('memory-card');
            const cardFront = document.createElement('div');
            cardFront.classList.add('card__front');
            const cardImg = document.createElement('i');
            const cardImgBack =document.createElement('i');
            cardImg.classList.add('fas');
            cardImg.classList.add(`${resultRandom[i].image}`);
            cardImgBack.classList.add('fas');
            cardImgBack.classList.add('fa-utensils');
            cardsUl.appendChild(cardEl);
            cardEl.appendChild(cardImgBack);
            cardEl.appendChild(cardFront);
            cardEl.setAttribute('data-pair', `${resultRandom[i].name}`)
            cardFront.appendChild(cardImg);
            cardEl.addEventListener('click', flipCard);

        }
}

function flipCard(event){
    event.currentTarget.classList.add('flip');
    if(firstClicked === false){
        firstCard = event.currentTarget;
        firstClicked = true;
    } else {
    secondCard = event.currentTarget;
    blockCards();
    if(firstCard && secondCard){
        if (firstCard.dataset.pair === secondCard.dataset.pair){
            firstCard.lastChild.style.color = "#00a568";
            secondCard.lastChild.style.color = "#00a568";
            firstCard.classList.add('disable');
            secondCard.classList.add('disable');
            firstCard = '';
            secondCard = '';
            firstClicked = false;
            unblockCards();
            acc = acc + 2;
            if (acc === resultRandom.length){
                modal.style.display = '';
            }
        } else {
            setTimeout(flipBack, 1000);
            changeColor("#bc2701");            
        }
    }
    }
}

function flipBack (){
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    changeColor("");
    firstCard = '';
    secondCard = '';
    firstClicked = false;
    unblockCards();
}

function changeColor(color){
    firstCard.lastChild.style.color = color;
    secondCard.lastChild.style.color = color;
}


function createNewArray(valueNumber){
    cardsValue = [];
    for(let i=0; i<valueNumber;i++){
        const newObject = iconsArray[i];
        cardsValue.push(newObject);
    }
}

function blockCards(){
    const cards = cardsUl.querySelectorAll('.memory-card'); 
    for(let i=0; i<cards.length; i++){
        cards[i].removeEventListener('click', flipCard)
    }
}

function unblockCards(){
    const cards = cardsUl.querySelectorAll('.memory-card:not(.disable)'); 
    for(let i=0; i<cards.length;i++){
        cards[i].addEventListener('click', flipCard);
    }
}

function handlerModalClick(){
    modal.style.display="none";
    acc = 0;
    cardsUl.innerHTML = '';
    for(let i = 0; i< inputs.length;i++){
        if(inputs[i].checked){
            inputs[i].checked = false;
        }
    }

}

//listener
btnSubmit.addEventListener('click', handlerClick);
btnModal.addEventListener('click' , handlerModalClick);