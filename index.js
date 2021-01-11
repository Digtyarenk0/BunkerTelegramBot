const {Telegraf, Markup} = require('telegraf')
const config = require('./config/token.json')
const bot = new Telegraf(config.token)

const biologicalCharacteristicDTG = require('./dataToGenerate/BiologicalCharacteristic.json')
const baggageDTG = require('./dataToGenerate/Baggage.json')
const professionDTG = require('./dataToGenerate/Profession.json')
const healthAndPhysiqueDTG = require('./dataToGenerate/HealthAndPhysique.json')
const additionalInformationDTG = require('./dataToGenerate/AdditionalInformation.json')
const hobbyDTG = require('./dataToGenerate/Hobby.json')
const traitDTG = require('./dataToGenerate/Trait.json')
const mapOneDTG = require('./dataToGenerate/MapOne.json')
const mapTwoDTG = require('./dataToGenerate/MapTwo.json')
const phobiaDTG = require('./dataToGenerate/Phobia.json')

const bunkerBTG = require('./dataToGenerate/Bunker.json')
const catastropheBTG = require('./dataToGenerate/Catastrophe.json')

bot.use(Telegraf.log())


bot.start((ctx) =>
    ctx.reply(
        'Привет!\n' +
        'Я бот для игры в Бункер!\n' +
        'Что? Ты не знаешь что это за игра?\n' +
        'Все можно узнать тут [заглушка]\n' +
        'Если Ты готов к игре. \n' +
        'Нажми /game или напиши Старт', Markup.keyboard([['Старт']]).oneTime().resize()))
bot.help((ctx) => ctx.reply('Список комманд:\n' +
    '/game - Меню генерации'))
bot.on('sticker', (ctx) => ctx.reply('Это не то сообщение, что я ищу'))
bot.command('game', (ctx) => ctx.reply("Давай сгенерируем...", Markup.keyboard([
    ['Бункер 🕋', 'Игрока 👤'],
    ['🚧 Катастрофу 🚧']
]).oneTime().resize()))

bot.hears('Старт', (ctx) => ctx.reply("Давай сгенерируем...", Markup.keyboard([
    ['Бункер 🕋', 'Игрока 👤'],
    ['🚧 Катастрофу 🚧']
]).oneTime().resize()))

bot.hears('Бункер 🕋', (ctx) => {
    let bunkerSQ = bunkerBTG.Square[Math.floor(Math.random() * bunkerBTG.Square.length)]
    let bunkerTI = bunkerBTG.Time[Math.floor(Math.random() * bunkerBTG.Time.length)]
    let bunkerST = bunkerBTG.State[Math.floor(Math.random() * bunkerBTG.State.length)]
    let bunkerPR = bunkerBTG.Protection[Math.floor(Math.random() * bunkerBTG.Protection.length)]
    let bunkerSY = bunkerBTG.Systems[Math.floor(Math.random() * bunkerBTG.Systems.length)]
    let bunkerEQ = bunkerBTG.Equipped[Math.floor(Math.random() * bunkerBTG.Equipped.length)]
    let bunkerWA = bunkerBTG.Warehouse[Math.floor(Math.random() * bunkerBTG.Warehouse.length)]
    let bunkerPE = bunkerBTG.Pests[Math.floor(Math.random() * bunkerBTG.Pests.length)]
    ctx.reply('🕋 Ваш бункер: 🕋 \n' +
        '🎫 Площадь убежища: ' + bunkerSQ + "\n" +
        '🕰 Время нахождения в убежище: ' + bunkerTI + "\n" +
        '🧰 Состояние: ' + bunkerST + "\n" +
        '🔒 Защита: ' + bunkerPR + "\n" +
        '⚙️Системы: ' + bunkerSY+ "\n" +
        '🎛️ В убежище оборудовано: ' + bunkerEQ + "\n" +
        '📦 Склад: ' + bunkerWA + "\n" +
        '🦠 Вредители: ' + bunkerPE + "\n")
})

bot.hears('Игрока 👤', (ctx) => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getSick() {
        let arr = ["Sick", "SevereIllnesses"]
        let typeS = arr[Math.floor(Math.random() * 2)]
        if (typeS == "Sick") {
            return healthAndPhysiqueDTG.Sick[Math.floor(Math.random() * healthAndPhysiqueDTG.Sick.length)]
        } else {
            let a = healthAndPhysiqueDTG.SevereIllnesses[Math.floor(Math.random() * healthAndPhysiqueDTG.SevereIllnesses.length)]
            return a + " " + healthAndPhysiqueDTG.SevereIllnessesType[a][Math.floor(Math.random() * healthAndPhysiqueDTG.SevereIllnessesType[a].length)]
        }
    }

    let bCG = biologicalCharacteristicDTG.gender[Math.floor(Math.random() * 2)]
    let bCA = Math.floor(getRandomInt(16, 80))
    let bCF = biologicalCharacteristicDTG.fertility[Math.floor(Math.random() * 5)]

    let baggage = baggageDTG[Math.floor(Math.random() * baggageDTG.length)];

    let profession = professionDTG[Math.floor(Math.random() * professionDTG.length)]

    let healthAndPhysiqueBT = healthAndPhysiqueDTG.BodyType[Math.floor(Math.random() * healthAndPhysiqueDTG.BodyType.length)]
    let healthAndPhysiqueHS = healthAndPhysiqueDTG.HealthStatus[Math.floor(Math.random() * healthAndPhysiqueDTG.HealthStatus.length)]
    let healthAndPhysiqueS = getSick()
    let sick = Math.random() > 0.5 ? healthAndPhysiqueHS : healthAndPhysiqueS

    let additionalInformation = additionalInformationDTG[[Math.floor(Math.random() * additionalInformationDTG.length)]]

    let hobby = hobbyDTG[[Math.floor(Math.random() * hobbyDTG.length)]]

    let train = traitDTG[[Math.floor(Math.random() * traitDTG.length)]]

    let mapOne = mapOneDTG[[Math.floor(Math.random() * mapOneDTG.length)]]
    let mapTwo = mapTwoDTG[[Math.floor(Math.random() * mapTwoDTG.length)]]

    let phobia = phobiaDTG[[Math.floor(Math.random() * phobiaDTG.length)]]

    ctx.reply('Карта игрока: 👤\n' +
        'Пол: ' + bCG + '\n' +
        '🗓 Возраст: ' + bCA + '\n' +
        '🛌 Плодовитость: ' + bCF + '\n' +
        '💼 Профессия: ' + profession + '\n' +
        '🧬 Здоровье: ' + sick + '\n' +
        '🥋 Телосложение: ' + healthAndPhysiqueBT + '\n' +
        '🧳 Багаж: ' + baggage + '\n' +
        '🕧 Хобби: ' + hobby + '\n' +
        '🆘 Фобия: ' + phobia + '\n' +
        '🗿 Характер: ' + train[0].toUpperCase() + train.slice(1) + '\n' +
        '❇️Доп. информация: ' + additionalInformation + '\n' +
        '🃏 Карта 1: ' + mapOne + '\n' +
        '🎴 Карта 2: ' + mapTwo + '\n')
})

bot.hears('🚧 Катастрофу 🚧', (ctx) => {
    let catastrophe = catastropheBTG[Math.floor(Math.random() * catastropheBTG.length)]
    ctx.reply('🚧 Катастрофу: 🚧 \n' + catastrophe)
})

bot.launch().then(() => console.log("Bot worked!"))
