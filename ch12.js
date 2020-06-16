const readline = require('readline');

const fs = require('fs');

const params = process.argv[2];

if (!params) {

    console.log('Tolong sertakan nama file sebagai inputan soal!\nMisalnya "node challenge12.js data.json"');

    process.exit(0);

}

const soal = JSON.parse(fs.readFileSync('soal.json'));

const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout,

    prompt: 'Jawaban: '

});

console.log(`\nSelamat datang di permainan tbak-tebakan, kamu akan di berikan pertanyaan dari soal '${params}' untuk bermain`)

console.log('Gunakan "skip" untuk menangguhkan pertanyaan, dan di akhir pertanyaan akan ditanyakan lagi\n');

console.log(`Pertanyaan: ${soal[0].definition}`);

rl.prompt()

let count = 0;

let worng = 1;

rl.on('line', (answer) => {

    if (answer == 'skip') {

        soal.push(soal[count]);

        count++;

        worng = 1;

        console.log(`\nPertanyaan: ${soal[count].definition}`);

    } else {

        if (answer.toLowerCase() == soal[count].term.toLowerCase()) {

            console.log('Anda beruntung!\n');

            count++;

            worng = 1;

            if (count == soal.length) {

                console.log('Selamat anda berhasil!\n');

                process.exit(0);

            }

            console.log(`Pertanyaan: ${soal[count].definition}`);

        } else {

            console.log(`Anada kurang beruntung! anda telah salah ${worng} kali, silahkan coba lagi.\n`);

            worng++

        }

    }

    

    rl.prompt();

}).on('close', () => {

    console.log()

    process.exit(0);

});