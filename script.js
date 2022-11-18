"use strict"

let questions =
[
    [
        "Ваш пол?",
        "мужской",
        "женский"
    ],
    [
        "Ваш возраст?",
        "старше 40",
        "40 или младше"
    ],
    [
        "Связана ли Ваша профессия с работой на компьютере?",
        "да",
        "нет"
    ],
    [
        [
            "С чем Вы чаще имеете дело на работе?",
            "с текстом",
            "с графикой"
        ],
        [
            "Связана ли Ваша работа с физическим трудом?",
            "да",
            "нет"
        ]
    ],
    [
        "Увлекаетесь ли Вы компьютерными играми?",
        "да",
        "нет"
    ],
    [
        "Вы левша или правша?",
        "левша",
        "правша"
    ],
    [
        "Неудобный вопрос... Но Вы страдаете туннельным синдромом?",
        "да",
        "нет"
    ],
    [
        "Как часто Вы покупаете новые компьютерные аксессуары?",
        "чаще, чем раз в полгода",
        "реже, чем раз в полгода"
    ],
    [
        "Где Вы предпочитаете выбирать компьютерную технику?",
        "в интернете",
        "в офлайн-магазине"
    ]
];

const answers = [];
const url = 'https://script.google.com/macros/s/AKfycbw2Ux3Z64INnGgT-W-WtoTJFrwqecDxOxFcnEzdL-wSPUjC_jj_JHpJnejb0EtI2fBlIg/exec';
let i = 0;

function init(e)
{
    start.style.visibility = "hidden";
    button0.style.visibility = "visible";
    button1.style.visibility = "visible";
    echo(null, null);
}

function finalize()
{
    box.style.marginTop = '40vh'
    box.style.marginBottom = '0vh'
    box.innerHTML = "Спасибо за участие в опросе!";
    button0.style.visibility = "hidden";
    button1.style.visibility = "hidden";
    submit(answers);
}

function submit(answers) {
    let request = new XMLHttpRequest();
    let formData = new FormData();
    request.open('POST', url, true);
    request.onload = function() {
        console.log(request.responseText);
    };
    formData.append('answers', JSON.stringify(answers));
    request.send(formData);
}

function echo(e, id) {
    if(i > 0)
        answers.push(id ? "r" : "l");
    if(i < questions.length)
    {
        let question = typeof(questions[i][0]) === "string" ? questions[i] : questions[i][id];
        box.innerHTML = question[0];
        button0.innerHTML = "<span>" + question[1] + "</span>";
        button1.innerHTML = "<span>" + question[2] + "</span>";
        i++;
    }
    else
    {
        finalize();
    }
}

let box = document.getElementById("box");
let start = document.getElementById("start");
let button0 = document.getElementById("button0");
let button1 = document.getElementById("button1");
let input = document.getElementById("input");
start.addEventListener("click", e => init(e));
button0.addEventListener("click", e => echo(e, 0));
button1.addEventListener("click", e => echo(e, 1));
