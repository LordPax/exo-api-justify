const { userExist, addUser } = require('../models/user_model')
const jwt = require('jsonwebtoken')

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
    return textFormat(wordList, large)
}

/*
* fonction qui ajoute les espaces manquant à chaques phrases afin de les justifiers 
* (wordList:string, large?:number, res?:string, acc?:number) => string
*
* @param wordList : tableau de mots
* @param large : defini la largeur du texte à justifier (80 caratères par défaut)
* @param res : le résultat sera concaténé ici à chaque itérations
* @param acc : indice du mot à traiter, sert indirectement pour la condition d'arret
* @return retourne le texte justifier de 80 caratères de large
*/
const textFormat = (wordList, large, res = '', acc = 0) => {
    const { line, stop } = lineFormat(wordList, large, acc)
    const size = line.map(w => w.length + 1).reduce((acc2, v) => acc2 + v) - 1
    const nbSpace = large - size

    const newLine = stop < wordList.length - 1 
    ? line.map((word, i) => i < nbSpace ? word + ' ' : word) : line
    const newRes = acc === 0 ? newLine.join(' ') : res + '\n' + newLine.join(' ')

    return stop < wordList.length - 1 ? textFormat(wordList, large, newRes, stop) : newRes
}

/*
* fonction retournant un phrase de moins de 80 caratères, sous forme d'un tableau
* (wordList:string, large?:number, acc?:number, res?:string[], count?:number) => {line:string[], stop:number}
*
* @param wordList : tableau de mots
* @param large : defini la largeur du texte à justifier (80 caratères par défaut)
* @param acc : indice du mot à traiter, peut servir pour la condition d'arret
* @param res : un mot sera ajouter ici à chaque itérations
* @param count : compte la taille de chaque mots (+ 1 espace) pour avoir la taille de la phrase (init à -1 car on ne compte pas l'espace de la fin)
* @return retourne un objet contenant line : phrase de moins de 80 caratères et stop : l'indice du dernier mot traiter
*/
const lineFormat = (wordList, large, acc = 0, res = [], count = -1) => {
    const size = count + wordList[acc].length + 1
    const newRes = [...res, wordList[acc]]
    const last = acc === wordList.length - 1 ? newRes : res

    return size <= large && acc < wordList.length - 1
    ? lineFormat(wordList, large, acc + 1, newRes, size) 
    : {line : last, stop : acc}
}

const escapeHtml = text => {
    const map = {
        '<': '&lt;',
        '>': '&gt;',
    }
    return text.replace(/[<>]/g, m => map[m])
}

const emailVerif = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}


module.exports = { 
    justify,
    lineFormat,
    textFormat,
    escapeHtml,
    emailVerif
}