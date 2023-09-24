let playbtn = document.getElementById("play-btn")
let content = document.getElementById("content")
let game = document.getElementById("game")
let add_bee = `<img src="img/Bee.svg" alt="Bee">`
let operation_objects = {
    "operation_field_1":document.getElementById("operation-field-1"),
    "operation_field_2":document.getElementById("operation-field-2"),
    "sing_operation":document.getElementById("sing-operation"),
    "option_1_btn":document.getElementById("option-1-btn"),
    "option_2_btn":document.getElementById("option-2-btn"),
    "option_1_text":document.getElementById("option-1-text"),
    "option_2_text":document.getElementById("option-2-text")
}
let sounds = {
    "correct" : new Audio("audio/correct_sfx.mp3"),
    "incorrect" : new Audio("audio/incorrect_sfx.mp3"),
    "background" : new Audio("audio/background_sfx.mp3")
}
let max_sum = 10
let playPressed = false
var isAnswerIsFirtsBtn = false
var option_pressed = false

function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createBeesIn(num, element) {
    for (let i=0; i < num; i++) {
        element.innerHTML += add_bee
    }
}

function create_round() {
    option_pressed = false

    operation_objects.operation_field_1.innerHTML = ``
    operation_objects.operation_field_2.innerHTML = ``
    operation_objects.option_1_btn.setAttribute("class", "void-option")
    operation_objects.option_2_btn.setAttribute("class", "void-option")

    let equals = Random(2, max_sum)
    let operation_2 = equals - Random(1, (equals - 1))
    let operation_1 = equals - operation_2

    createBeesIn(operation_1, operation_objects.operation_field_1)
    createBeesIn(operation_2, operation_objects.operation_field_2)

    isAnswerIsFirtsBtn = (Math.random() > 0.5)
    
    let mistake = 1
    if (Math.random() > 0.5 && equals > 2) {
        mistake = -1
    }

    if(isAnswerIsFirtsBtn) {
        operation_objects.option_1_text.innerHTML = equals
        operation_objects.option_2_text.innerHTML = (equals + mistake)
    } else {
        operation_objects.option_1_text.innerHTML = (equals + mistake)
        operation_objects.option_2_text.innerHTML = equals
    }
}

function isCorrectBtnPressed(option_selected) {
    if (option_pressed) {return}
    option_pressed = true

    if (option_selected == 1) {
        if (isAnswerIsFirtsBtn) {
            sounds.correct.play()
            operation_objects.option_1_btn.classList.add("correct")
            operation_objects.option_1_btn.classList.remove("void-option")
        } else {
            sounds.incorrect.play()
            operation_objects.option_1_btn.classList.add("incorrect")
            operation_objects.option_1_btn.classList.remove("void-option")
        }
    } else {
        if (!isAnswerIsFirtsBtn) {
            sounds.correct.play()
            operation_objects.option_2_btn.classList.add("correct")
            operation_objects.option_2_btn.classList.remove("void-option")
        } else {
            sounds.incorrect.play()
            operation_objects.option_2_btn.classList.add("incorrect")
            operation_objects.option_2_btn.classList.remove("void-option")
        }
    }
    
    setTimeout(() => {
        create_round()
    }, 2000)
}

operation_objects.option_1_btn.addEventListener("click", () => {
    isCorrectBtnPressed(1)
})

operation_objects.option_2_btn.addEventListener("click", () => {
    isCorrectBtnPressed(2)
})

playbtn.addEventListener("click", () => {
    if (!playPressed) {
        content.classList.add("hide-main")
        content.classList.remove("show-main")

        game.classList.add("show-game")
        game.classList.remove("hide-game")

        create_round()
        sounds.background.play()
    }
    playPressed = true
})