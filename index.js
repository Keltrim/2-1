#!/usr/bin/env node

import * as readline from 'node:readline/promises';
import { open } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdin as input } from 'node:process';
import { getRandomInt } from "./cli/utils.js";

const minNumber = 1, maxNumber = 2;
const secretNumber = getRandomInt(minNumber, maxNumber);

const fileName = path.join(path.dirname(fileURLToPath(import.meta.url)), process.argv[2] ?? `logs.log`);
const rl = readline.createInterface({ input, output: await open(fileName, 'a+') });

console.log(`Орёл(${minNumber}) или решка(${maxNumber}). Попробуй угадать:`);
rl.on('line', (input) => {
    input = parseInt(input, 10);
    if (isNaN(input) || (input < 1 || input > 2)) {
        console.log('Пожалуйста, введите корректное число: 1 или 2');
    } else {
        const result = input === secretNumber ? {payload: true, message: `Вам просто повезло. Сыграйте еще раз`} : {payload: false, message: `А вот и нет`};
        rl.output.appendFile(`${result.payload}\n`);        
        console.log(result.message);
        rl.close();
    }
});

