// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro digito)
Se o numero digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Segundo digito)
Se o numero digito for maior que 9, consideramos 0.
*/

function tratarCpf(cpf){
    const cpfLimpo = cpf.replace(/\D+/g, '')
    const cpfArray = Array.from(cpfLimpo)
    let multiplicador = cpfArray.length
    let doisUltimos = ''

    function pegarDigito(){
        const arrayMult = cpfArray.map(num => {
            multiplicador--
            return multiplicador < 2? 0 : (num * multiplicador)
        })
        
        const arraySum = arrayMult.reduce((acumulador, num) => acumulador += Number(num), 0)
    
        return (11 - (Number(arraySum) % 11))
    }
    
    function adicionarDigito(){
        const digito = pegarDigito()
        doisUltimos += digito > 9 ? 0 : digito
    }
    
    while(doisUltimos.length < 2){
        if (doisUltimos.length == 1){ multiplicador = cpfArray.length + 1 }
        adicionarDigito()
    
        if (doisUltimos.length == 2){
    
            if (doisUltimos == cpfLimpo.slice(-2, cpfLimpo.length) && 
            cpfLimpo[0].repeat(cpfLimpo.length) != cpfLimpo){
                return true
            }
            else{
                return false
            }
        }
    }
}

/* tratarCpf('705.484.450-52') */
