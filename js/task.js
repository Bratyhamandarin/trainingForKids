window.onload = function newTask() {
    const regexp = /[0-9]/
    // задаем min/max для а
    const min = 6;
    const max = 9;

    const n1 = document.querySelector('#n-1')
    const n2 = document.querySelector('#n-2')
    const fin = document.querySelector('#final-answer')

    const body = document.querySelector('body')

    const inputn1 = document.querySelector('#n-1__input')
    const inputn2 = document.querySelector('#n-2__input')
    const inputSum = document.querySelector('#sum__answer')

    const labeln1 = document.querySelectorAll('#scale label')[0]
    const labeln2 = document.querySelectorAll('#scale label')[1]

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // генерация случайных чисел в заданном промежутке
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * ((14 - a) - (11 - a)) + (11 - a))
    const answer = a + b;

    // добавление на страницу
    n1.textContent = a;
    n2.textContent = b;

    // задаем параметры canvas
    let x = canvas.height = 128;
    let y = canvas.width = 802;

    // узнаем отступ слева
    let buffer = canvas.offsetLeft

    // задаем деление на шкале
    const part = 39;

    // расставляем инпуты
    labeln1.style.left = `${buffer + part * a / 2 - 8}px`;
    labeln1.style.top = `${100 - a * 10}px`
    labeln2.style.left = `${buffer + part * a + part * b / 2 - 8}px`;
    labeln2.style.top = `${100 - b * 10}px`

    // рендер a
    drawArcedArrow(
        ctx,
        a * part / 2, // координаты x
        x + part * a / 3, // координаты y
        3 * part * a / 5, // радиус 
        (Math.PI / 180) * 326, // начало
        (Math.PI / 180) * 180, // конец
        true // по часовой
    )

    inputn1.focus();

    body.oninput = (e) => {
        let val = e.target.value
        if (!regexp.test(val)) e.target.value = ''

        let action = e.target.getAttribute('data-action')
        switch (action) {
            case 'n1': checkNumber1(e)
                break;
            case 'n2': checkNumber2(e)
                break;
            case 'answer': checkAnswer(e)
                break;
        }
    };

    checkNumber1 = (e) => {
        let val = e.target.value
        if (val == a) {
            toggle(inputn1)
            toggle(inputn2)
            inputn2.focus()
            n1.style.backgroundColor = '';
            labeln1.textContent = a
            // рендер b
            drawArcedArrow(
                ctx,
                part * a + part * b / 2,
                x + part * b / 3,
                3 * part * b / 5,
                (Math.PI / 180) * 326,
                (Math.PI / 180) * 180,
                true
            )
        } else {
            n1.style.backgroundColor = 'yellow'
            inputn1.style.color = 'red'
        }
    };

    checkNumber2 = (e) => {
        let val = e.target.value
        if (val == b) {
            toggle(inputn2)
            toggle(fin)
            toggle(inputSum)
            inputSum.focus()
            labeln2.textContent = b
            n2.style.backgroundColor = '';
        } else {
            n2.style.backgroundColor = 'yellow'
            inputn2.style.color = 'red'
        }
    };

    checkAnswer = (e) => {
        let val = e.target.value
        if (e.target.value == answer) {
            fin.textContent = answer
            toggle(fin)
            toggle(inputSum)
        } else {
            inputSum.style.color = 'red'
        }
    };

    toggle = (target) => {
        target.classList.toggle('none')
    }
}

