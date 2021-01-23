const assert = require('assert')
const { lineFormat, textFormat, justify } = require('../src/include/utils')

describe('test of utils', () => {
    describe('#lineFormat()', () => {
        const lim = 12
        const lim2 = 24
        const text = 'lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip'
        const expect = ['lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adip', 'lorem', 'ipsum', 'dolor', 'sit', 'amet,']
        const expect2 = ['consectetur', 'adip', 'lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adip', 'lorem', 'ipsum', 'dolor']
        const expect3 = ['sit', 'amet,', 'consectetur', 'adip']

        // console.log(text.split(' ').filter((e, i) => i >= lim2))

        it('should be equal (part 1)', () => {
            const { line, stop } = lineFormat(text.split(' '), 80)
            assert.equal(line.join(' '), expect.join(' '))
        })

        it('should be equal (part 2)', () => {
            const { line, stop } = lineFormat(text.split(' '), 80, lim)
            assert.equal(line.join(' '), expect2.join(' '))
        })

        it('should be equal (part 3)', () => {
            const { line } = lineFormat(text.split(' '), 80, lim2)
            assert.equal(line.join(' '), expect3.join(' '))
        })

        it('should be equal (comnined)', () => {
            const { line:line1, stop } = lineFormat(text.split(' '), 80)
            const { line:line2, stop:stop2 } = lineFormat(text.split(' '), 80, stop)
            const { line:line3, stop:stop3 } = lineFormat(text.split(' '), 80, stop2)
            // const {line:line4, stop:stop4} = lineFormat(text.split(' '), 80, stop3)
            // const {line:line5} = lineFormat(text.split(' '), 80, stop4)

            // console.log(line3, line4, line5)

            // console.log(line1.join(' ') + '\n'+ line2.join(' ') + '\n' + line3.join(' '))
            
            assert.equal(line1.join(' '), expect.join(' '))
            assert.equal(line2.join(' '), expect2.join(' '))
            assert.equal(line3.join(' '), expect3.join(' '))
        })
    })

    describe('#textFormat()', () => {
        const text = 'lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip'
        const expect = 'lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet,\nconsectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor\nsit amet, consectetur adip'
        const text2 = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que'
        const expect2 = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\nmes yeux se fermaient si vite que'

        // const justifyText = textFormat(text.split(' '), 80)
        // console.log(justifyText)

        it.skip('should be equal', () => {
            const justifyText = textFormat(text.split(' '), 80)
            assert.equal(justifyText, expect)
        })

        it('should be equal', () => {
            const justifyText = textFormat(text2.split(' '), 80)
            assert.equal(justifyText, expect2)
        })
    })

    describe('#justify()', () => {
        const text = `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
 Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.`
        
        // console.log(text.replace(/[\n]/g, ''))
        const justifyText = justify(text)
        // console.log(justifyText)
    })
})