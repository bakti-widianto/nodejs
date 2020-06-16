const fs = require('fs');

let data = JSON.parse(fs.readFileSync('data.json'));

const readline = require('readline');

let rules = process.argv;

// console.log(rules);

const daftar = `>>> JS TODO <<<

$ node todo.js <command>
$ node todo.js list
$ node todo.js task <task_id>
$ node todo.js add <task_content>
$ node todo.js delete <task_id>
$ node todo.js complete <task_id>
$ node todo.js uncomplete <task_id>
$ node todo.js list:outstanding asc|desc
$ node todo.js list:completed asc|desc
$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node todo.js filter:<tag_name>`

const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout,

});

if (!process.argv[2]) {

    console.log(daftar);

    process.exit(0);

} else {

    switch (process.argv[2]) {

        case 'add':

            if (!process.argv[3]) {

                console.log('sertakan pekerjaan yang akan di kerjakan')

                process.exit(0);

            } else {

                let output = ''

                for (let i = 3; i < rules.length; i++) {

                    output += rules[i] + ' ';

                }

                data.push({

                    "task": output,

                    "complete": false,

                    "tags": []

                })

                fs.writeFileSync('data.json', JSON.stringify(data));

                console.log(`"${output.trim()}" telah di tambahkan`);

                process.exit(0);

            }

            break;

        case 'list':

            console.log('Daftar pekerjaan');

            for (let i = 0; i < data.length; i++) {

                console.log(`${i + 1}. ${data[i].complete ? '[X]' : '[ ]'} ${data[i].task}`);

            }

            process.exit(0);

        case 'delete':

            if (!process.argv[3]) {

                console.log('tolong sertakan no pekerjaan');

                process.exit(0);

            } else {

                let count = 0

                for (; count < process.argv[3]; count++) {

                }

                console.log(`"${data[count - 1].task}" telah di hapus dari daftar`);

                data.splice(count - 1, 1);

                fs.writeFileSync('data.json', JSON.stringify(data));

                process.exit(0);

            }

            break;

        case 'complete':

            if (!process.argv[3]) {

                console.log('tolong sertakan no pekerjaan');

                process.exit(0);

            } else {

                let count = 0

                for (; count < process.argv[3]; count++) {

                }

                console.log(`"${data[count - 1].task.trim()}" telah selesai`)

                data[count - 1].complete = true;

                fs.writeFileSync('data.json', JSON.stringify(data));

                process.exit(0);

            }

            break;

        case 'uncomplete':

            if (!process.argv[3]) {

                console.log('tolong sertakan no pekerjaan');

                process.exit(0);

            } else {

                let count = 0

                for (; count < process.argv[3]; count++) {

                }

                console.log(`"${data[count - 1].task.trim()}" telah selesai dibatalkan`)

                data[count - 1].complete = false;

                fs.writeFileSync('data.json', JSON.stringify(data));

                process.exit(0);

            }

            break;

        case 'help':

            console.log(daftar);

            process.exit(0);

            break;

        case 'list:outstanding':

            if (process.argv[3] == 'asc') {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].complete == false) {

                        console.log(`${i + 1}. ${data[i].complete ? '[X]' : '[ ]'} ${data[i].task}`);

                    }

                }

                process.exit(0);

            } else if (process.argv[3] == 'desc') {

                for (let i = data.length - 1; i >= 0; i--) {

                    if (data[i].complete == false) {

                        console.log(`${i + 1}. ${data[i].complete ? '[X]' : '[ ]'} ${data[i].task}`);

                    }

                }

                process.exit(0);

            } else {

                console.log('tolong sertakan asc|desc');

            }

        case 'list:completed':

            if (process.argv[3] == 'asc') {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].complete == true) {

                        console.log(`${i + 1}. ${data[i].complete ? '[X]' : '[ ]'} ${data[i].task}`);

                    }

                }

                process.exit(0);

            } else if (process.argv[3] == 'desc') {

                for (let i = data.length - 1; i >= 0; i--) {

                    if (data[i].complete == true) {

                        console.log(`${i + 1}. ${data[i].complete ? '[X]' : '[ ]'} ${data[i].task}`);

                    }

                }

                process.exit(0);

            } else {

                console.log('tolong sertakan asc|desc');

            }

        case 'tag':

            if (!process.argv[3]) {

                console.log('tolong sertakan no pekerjaan');

            } else {

                let count = 0;

                let arr = []

                for (; count < process.argv[3]; count++) {

                }

                for (let i = 4; i < rules.length; i++) {

                    arr.push(process.argv[i])

                }

                data[count - 1].tags.push(arr.toString());

                fs.writeFileSync('data.json', JSON.stringify(data));

                console.log(`tag '${arr}' telah ditambahkan ke daftar '${data[count - 1].task}'`);

                process.exit(0);

            }

            break;

        case 'filter':

            if (!process.argv[3]) {

                console.log('tolong sertakan tag pekerjaan');

            } else {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].tags.toString().includes(process.argv[3]) == true) {

                        console.log(`${i + 1}. ${data[i].complete ? '[X]' : '[ ]'} ${data[i].task}`);

                        process.exit(0);

                    }

                }

            }

            break;

        default:

            console.log('inputan yang anda masukan salah gunakan "help" untuk bantuan')

            process.exit(0);

    }

}