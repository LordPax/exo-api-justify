/*
* fonction retournant un text justifié
* (text:string, large?:number) => string
*
* @param text : texte à justifier (80 000 mots/jours pour les non prémium)
* @param large : defini la largeur du texte à justifier (80 caratères par défaut)
* @return retourne le texte justifier de 80 caratères de large
*/
const justify = (text, large = 80) => {
    const wordList = text.replace(/[\n]/g, '').split(' ')
    // const wordList = text.split(' ')
    return textFormat(wordList, large)
}

const textFormat = (wordList, large, res = '', acc = 0) => {
    const { line, stop } = lineFormat(wordList, large, acc)
    const size = line.map(w => w.length + 1).reduce((acc2, v) => acc2 + v) - 1
    const nbSpace = large - size
    const spaceWord = Math.round(nbSpace / (line.length - 1))
    const spaceRep = nbSpace % (line.length - 1)

    const newLine = stop < wordList.length - 1 
    ? line.map((word, i) => i < nbSpace ? word + ' ' : word) : line
    const newRes = acc === 0 ? newLine.join(' ') : res + '\n' + newLine.join(' ')

    return stop < wordList.length - 1 ? textFormat(wordList, large, newRes, stop) : newRes
}

const lineFormat = (wordList, large, acc = 0, res = [], count = -1) => {
    const size = count + wordList[acc].length + 1
    const newRes = [...res, wordList[acc]]
    const last = acc === wordList.length - 1 ? newRes : res

    return size <= large && acc < wordList.length - 1
    ? lineFormat(wordList, large, acc + 1, newRes, size) 
    : {line : last, stop : acc}
}

module.exports = { 
    justify,
    lineFormat,
    textFormat
}