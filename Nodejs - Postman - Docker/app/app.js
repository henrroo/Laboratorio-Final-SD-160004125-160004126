const express = require('express')
const app = express()
const port = 3000
var numbers = []

//Codigos: 160004125 - 160004126

function createNumber() {
    numbers[0] = Math.floor(Math.random() * (9 - 0));
    var i = 1;
    var n;
    while (i <= 3) {
        n = Math.floor(Math.random() * (9 - 0));
        if (!numbers.includes(n)) {
            numbers[i] = n;
            i++;
        }
    }
    console.log(numbers[0] + "" + numbers[1] + "" + numbers[2] + "" + numbers[3]);
}

function validateN(number) {
    vali = true;
    console.log(number.length);
    if (number.length != 4) {
        vali = false;
    }
    if (vali) {
        for (let i = 0; i < number.length; i++) {
            for (let j = 0; j < number.length; j++) {
                if (i != j && number[i] == number[j]) {
                    vali = false;
                    break;
                }
            }

        }
    }
    return vali;
}

function game(n, res) {
    var p = 0;
    var f = 0;
    for (let i = 0; i < n.length; i++) {
        for (let j = 0; j < n.length; j++) {
            if (n[i] == numbers[j]) {
                if (i == j) {
                    f++;
                } else {
                    p++;
                }
            }
        }
    }
    if (f == 4) {
        res.send('Ganaste, has adivinado el numero!');
        numbers = [];
        createNumber();
    } else {
        res.send('Tuviste ' + f + ' fijas y ' + p + ' picas.')
    }
}


app.get('/', (req, res) => {
    const n = req.query.n;
    if (validateN(n)) {
        game(n, res);
    } else {
        res.send('Digite un numero de 4 cifras sin que se repitan.');
    }
})

app.post('/', (req, res) => {
    const x = req.query.name;
    res.send('Hola ' + x)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

createNumber();