window.onload = function newTask() {
    // задаем min/max для а
    const min = 6;
    const max = 9;

    const n1 = document.querySelector('#n-1')
    const n2 = document.querySelector('#n-2')
    const fin = document.querySelector('#final-answer')

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
    let x = canvas.height = 96;
    let y = canvas.width = 802;

    // узнаем отступ слева
    let buffer = canvas.offsetLeft

    // задаем деление на шкале
    const part = 39;

    // расставляем инпуты
    labeln1.style.left = `${buffer + part * a / 2 - 8}px`;
    labeln2.style.left = `${buffer + part * a + part * b / 2 - 8}px`;
    labeln2.style.top = '25px'

    // рендер a
    ctx.beginPath();
    ctx.moveTo(0, x);
    ctx.quadraticCurveTo((part * a) / 2, -40, part * a, x);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e80ee0e9";
    ctx.stroke();

    inputn1.addEventListener('input', (e) => {
        if (e.target.value == a) {
            toggle(inputn1)
            toggle(inputn2)
            n1.style.backgroundColor = '';
            labeln1.textContent = a
            // рендер b
            ctx.beginPath();
            ctx.moveTo(part * a, x);
            ctx.quadraticCurveTo(part * a + part * b / 2, 10, part * (a + b), x);
            ctx.stroke();
        } else {
            n1.style.backgroundColor = 'yellow'
            inputn1.style.color = 'red'
        }
    });

    inputn2.addEventListener('input', (e) => {
        if (e.target.value == b) {
            toggle(inputn2)
            toggle(fin)
            toggle(inputSum)
            labeln2.textContent = b
            n2.style.backgroundColor = '';
        } else {
            n2.style.backgroundColor = 'yellow'
            inputn2.style.color = 'red'
        }
    });

    inputSum.addEventListener('input', (e) => {
        if (e.target.value == answer) {
            fin.textContent = answer
            toggle(fin)
            toggle(inputSum)
        } else {
            inputSum.style.color = 'red'
        }
    })

    toggle = (target) => {
        target.classList.toggle('none')
    }
}

