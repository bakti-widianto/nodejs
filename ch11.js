const fs = require('fs')

const soal = JSON.parse(fs.readFileSync('soal.json'));

const readline = require('readline');

const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout,

    prompt: 'Tebakan: '

});

console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n')

console.log(`Pertanyaan: ${soal[0].definition}`);

rl.prompt();

let count = 0;

rl.on('line', (line) => {

    if (line.toLowerCase() == soal[count].term.toLowerCase()) {

        console.log('Selamat anda benar!\n');

        count++;

        if (count == soal.length) {

            console.log('Hore Anda Menang!\n');

            process.exit(0);

        }

        console.log(`Pertanyaan: ${soal[count].definition}`);

    } else {

        console.log('Wkwkwkw Anda kurang beruntung!\n');

    }

    rl.prompt();

})