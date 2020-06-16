
const readline = require('readline');

const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout,

    prompt: 'tulis kalimatmu disini > '

});

rl.prompt();

rl.on('line', (line) => {

    switch (line) {

        case 'hello':

            console.log('world!');

            break;

        default:

            console.log(`hasil konversi: ${sentenceManipulation(line)}`);

            break;

    }

    rl.prompt();

}).on('close', () => {

    console.log('good bye !');

    process.exit(0);

});

function sentenceManipulation(str) {

    let word = str.split(' ');

    let result = '';



    for (i = 0; i < word.length; i++) {

        let alpha = word[i].charAt(0);

        if (alpha == 'a' || alpha == 'i' || alpha == 'u' || alpha == 'e' || alpha == 'o') {

            result += word[i] + ' ';

        } else {

            result += word[i].slice(1) + alpha + 'nyo '

        }

    }

    return result;

}

