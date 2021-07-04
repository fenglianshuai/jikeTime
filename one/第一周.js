let str = 'abcdefg';

function getStr(str, key) {
    const k = key;
    let i = 0;
    for (let s =0;s<str.length;s++) {
        if (str[s] === k[i]) {
            if(i === key.length - 1){
                return true;
            }
            ++i;
            continue;
        } else {
            i = 0;
        }
    }
    return false;
}

console.log(getStr(str, 'ab'));

// 状态机

// function match(string) {
//     let state = start;
//     for (let c of string) {
//         state = state(c)
//     }
//     return state === end;
// }

// function start(c) {
//     if (c === 'a') {
//         return fountdA
//     }
//     return start
// }

// function end(c) { // 陷阱一旦进入end状态就不会再进入其他状态
//     return end
// }

// function fountdA(c) {
//     if (c === 'b') {
//         return fountdB
//     }
//     return start(c)
// }

// function fountdB(c) {
//     if (c === 'c') {
//         return fountdC
//     }
//     return start(c)
// }

// function fountdC(c) {
//     if (c === 'd') {
//         return fountdD
//     }
//     return start(c)
// }

// function fountdD(c) {
//     if (c === 'e') {
//         return fountdE
//     }
//     return start(c)
// }

// function fountdE(c) {
//     if (c === 'f') {
//         return end
//     }
//     return start(c)
// }

// console.log(match('ababcdef'))


// function match(string) {
//     let state = start;
//     for (let c of string) {
//         state = state(c)
//     }
//     return state === end;
// }

// function start(c) {
//     if (c === 'a') {
//         return fountdA
//     }
//     return start
// }

// function end(c) { // 陷阱一旦进入end状态就不会再进入其他状态
//     return end
// }

// function fountdA(c) {
//     if (c === 'b') {
//         return fountdB
//     }
//     return start(c)
// }

// function fountdB(c) {
//     if (c === 'c') {
//         return fountdC
//     }
//     return start(c)
// }

// function fountdC(c) {
//     if (c === 'c') {
//         return fountdA2
//     }
//     return start(c)
// }

// function fountdA2(c) {
//     if (c === 'b') {
//         return fountdB2
//     }
//     return start(c)
// }

// function fountdB2(c) {
//     if (c === 'x') {
//         return end
//     }
//     return fountdB(c)
// }

// console.log(match('abcabcabx'))

// function match(string) {
//     let state = start;
//     for (let c of string) {
//         state = state(c)
//     }
//     return state === end;
// }

// function start(c) {
//     if (c === 'a') {
//         return fountdA
//     }
//     return start
// }

// function end(c) { // 陷阱一旦进入end状态就不会再进入其他状态
//     return end
// }

// function fountdA(c) {
//     if (c === 'b') {
//         return fountdB
//     }
//     return start(c)
// }
// function fountdB(c) {
//     if (c === 'a') {
//         return fountdA2
//     }
//     return start(c)
// }
// function fountdA2(c) {
//     if(c === 'b') {
//         return fountdB2
//     }
//     return start(c)
// }
// function fountdB2(c) {
//     if(c === 'a') {
//         return fountdA3
//     }
//     return start(c)
// }
// function fountdA3(c) {
//     if(c === 'b') {
//         return fountdB4
//     }
//     return start(c)
// }

// function fountdB4(c) {
//     if(c==='x') {
//         return end;
//     }
//     return start(c)
// }

// console.log(match('abababx'))
