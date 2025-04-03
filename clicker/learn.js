class Storage {
    constructor(){
        if (this.getClickCount() == null) {
            // Если кликов 0 значит пользователь новый назначем 0
            this.saveData(0)
        }
        if (this.getIsFirst == null){

            this.setIsFirst('true')
        }
    }

    saveData(clickCount) {
        localStorage.setItem('clickCount', clickCount)
    }

    getClickCount() {
        return Number(localStorage.getItem('clickCount'))
    }
    // Вызываем кнопокой очистить
    clear() {
        this.saveData(0)
    }

    setIsFirst(isFirst) {
        
        localStorage.setItem('isFirst', isFirst)
        
    }

    getIsFirst() {
        return localStorage.getItem('isFirst')
    }

    getFirstClick() {
        return localStorage.getItem('firstClick')
    }

    setFirstClick(firstClick) {
        localStorage.setItem('firstClick', firstClick)
    }

    getMaxCount() {
        return localStorage.getItem('maxCount')
    }

    setMaxCount(maxCount) {
        localStorage.setItem('maxCount', maxCount)
    }

    setMaksim(maksim) {
        localStorage.setItem('maksim', maksim)
    }

    setRomanov(romanov) {
        localStorage.setItem('romanov', romanov)
    }

    setKobik(kobik) {
        localStorage.setItem('kobik', kobik)
    }

    setAvdeev(avdeev) {
        localStorage.setItem('avdeev', avdeev)
    }

    getMaksim() {
        return Number(localStorage.getItem('maksim'))
    }

    getRomanov() {
        return Number(localStorage.getItem('romanov'))
    }

    getKobik() {
        return Number(localStorage.getItem('kobik'))
    }

    getAvdeev() {
        return Number(localStorage.getItem('avdeev'))
    }
    getUpgrades() {
        let upgrades = {
            "maksim": this.getMaksim(),
            "romanov": this.getRomanov(),
            "kobik": this.getKobik(),
            "avdeev": this.getAvdeev()
        }
        return upgrades
    }
    
    clearUpgrades(){
        this.setMaksim(0)
        this.setRomanov(0)
        this.setKobik(0)
        this.setAvdeev(0)
    }

    getStartTime() {
        return Number(localStorage.getItem('startTime'))
    }

    setStartTime(startTime) {
        localStorage.setItem('startTime', startTime)
    }

    isUpdated() {
        return localStorage.getItem('isUpdated')
    }

    setIsUpdated(isUpdated) {
        localStorage.setItem('isUpdated', isUpdated)
    }
   
}


class Level {
    
    constructor(title, countMark, imageMark) {
        this.title = title
        this.countMark = countMark
        this.imageMark = imageMark
    }

    getTitle(){
        return this.title
    }

    getCountMark() {
        return this.countMark
    }

    getImageMark() {
        return 'snus/' + this.imageMark
    }

}

class LevelManager {
    levelMarks = {
        0 : new Level('Сига сосатель', 0, 'snus/snus_light.png'),
        1 : new Level('Шкильник', 1000, 'snus/ex_corvus.png'),
        2 : new Level('Доходяга', 2000, 'snus/brutal.png'),
        3 : new Level('Бывалый', 3000, 'snus/snus1.png'),
        4 : new Level('Крутой', 5000, 'snus/suicide.png'),
        5 : new Level('Бог', 7500, 'snus/bog.png')
    }

    constructor(clickCount) {
        this.currentLevel = 0
        this.clickCount = clickCount
    }
    
    getCurrentLevel() {
        let currentLevel
        let size = Object.keys(this.levelMarks).length
        for(let i = 0; i < size; i++) {
            if(this.clickCount >= this.levelMarks[i].countMark){
                currentLevel = this.levelMarks[i]
                
            }else {
                currentLevel = this.levelMarks[i - 1]
                break
            }
            
        }
        return currentLevel
    }
    
}

class Board {
    constructor() {
        let text = "Какой то текст"
        this.board = document.getElementById('board')
        this.boardText = document.getElementsByClassName('board_text')[0]
            
        // При нажатие на кнопки доски написание текста отменяется
        document.getElementById('board_button').addEventListener('click', function(handler){
            clearInterval(this.textInterval)
            anime({
                targets: "#board",
                translateX: -2000,
                opacity: "0",
                duration: 2000,
                complete: function(){
                    // Скрываем доску
                    board.style.visibility = 'hidden'
                }          
            })
           
        })
    }

    writeText(text) {
        // Очищаем текст доски
        this.boardText.textContent = ''
        // Счетчик
        let i = 0
        const self = this
        this.textInterval = setInterval(function writeText(handler){
            // Вставляем текст
           
            self.boardText.textContent += text.charAt(i)
            // Если счётчик больше длины текста, написание прекращается
            if (i > text.length) {
                clearInterval(this.textInterval)
            }
            
            
            i += 1
        }, 80)
        this.board.addEventListener('click', function click(handler){
            self.boardText.textContent = text
            console.log('click')
            clearInterval(self.textInterval)
            i = 0
        })
        
    }



    hide() {
        this.board.style.visibility = 'hidden'
    }

    
}

class Tutorial {
    
}

class UpdatedInformer {
    constructor(storage) {
        this.storage = storage
        this.isUpdated = this.storage.isUpdated()
    }
}

class Store {
    constructor(game) {
        
        let upgrades = game.storage.getUpgrades()
        let store = document.getElementsByClassName('store')[0]
        store.addEventListener('click', function(hander){
            game.initUpgrades()
        })
        console.log(upgrades)
        for(let i = 0; i < upgrades['maksim']; i++){
            setInterval(function interval(handler){
                game.clickCount += 1
                game.updateCounter(counter) 
            }, 1000)
        }

        for(let i = 0; i < upgrades['romanov']; i++){
            setInterval(function interval(handler){
                game.clickCount += 5
                game.updateCounter(counter)
                
            }, 1000)
        }

        for(let i = 0; i < upgrades['kobik']; i++){
            setInterval(function interval(handler){
                game.clickCount += 15
                game.updateCounter(counter)
                
            }, 1000)
        }

        for(let i = 0; i < upgrades['avdeev']; i++){
            setInterval(function interval(handler){
                game.clickCount += 40
                game.updateCounter(counter)
                
            }, 1000)
        }
        
        let low_item = document.getElementById('low')
        low_item.addEventListener('click', function(event){
            try {
                game.buyUpgrade(100)
            }catch(e){
                console.log(e.toString())
                game.showOnNotEnoughMoney()
                return
            }
            game.storage.setMaksim(game.storage.getMaksim() + 1)
            setInterval(function interval(handler){
                game.clickCount += 1
                console.log(game.storage.getMaksim() + 1)
                game.updateCounter(counter)
                
            }, 1000)
        })

        let medium_item = document.getElementById('medium')
        medium_item.addEventListener('click', function(event){
            try {
                game.buyUpgrade(3000)
            } catch (e) {
                console.log(e)
                game.showOnNotEnoughMoney()
                return
            }
            game.storage.setRomanov(game.storage.getRomanov() + 1)
            game.clickCount += 5
            setInterval(function interval(handler){
                
                game.updateCounter(counter)
            }, 1000)
        })


        let hard_item = document.getElementById('hard')
        hard_item.addEventListener('click', function(event){
            try {
                game.buyUpgrade(12000)   
            } catch (e) {
                console.log(e)
                game.showOnNotEnoughMoney()
                return

            }
            game.storage.setKobik(game.storage.getKobik() + 1)
            setInterval(function interval(handler){
                game.clickCount += 15
                
                game.updateCounter(counter)
            }, 1000)
        })


        let dead_item = document.getElementById('dead')
        dead_item.addEventListener('click', function(event){
            try{
                game.buyUpgrade(2 ** 14)
            }catch(e) {
                console.log(e.toString())
                game.showOnNotEnoughMoney()
                return
            }
            game.storage.setAvdeev(game.storage.getAvdeev() + 1)
            setInterval(function interval(handler){
                game.clickCount += 40
                
                game.updateCounter(counter)
            }, 1000)
        })
        

    }
}


class Game {
    constructor(){
        this.storage = new Storage()
        this.clickCount = this.storage.getClickCount()
        this.levelManager = new LevelManager(this.clickCount)
        this.isFirst = this.storage.getIsFirst()
        this.maksimAmount = document.getElementById('maksim_amount')
        this.romanovAmount = document.getElementById('romanov_amount')
        this.kobikAmount = document.getElementById('kobik_amount')
        this.avdeevAmount = document.getElementById('avdeev_amount')
        this.firstClick = this.storage.getFirstClick()   
        this.start = this.storage.getStartTime()
        this.updatedInformer = new UpdatedInformer(this.storage)    
        
    }
    init(counter, tutorial) {
        counter.textContent = this.clickCount
        this.tutorial = tutorial
        this.onFirst()
        this.setLevel()
        max.textContent = this.storage.getMaxCount() 
    }
    setCurrentLevel() {
        this.levelManager = new LevelManager(this.clickCount)
        this.level = this.levelManager.getCurrentLevel()
    }

    initUpgrades() {
        this.maksimAmount.textContent = this.storage.getMaksim()
        this.romanovAmount.textContent = this.storage.getRomanov()
        this.kobikAmount.textContent = this.storage.getKobik()
        this.avdeevAmount.textContent = this.storage.getAvdeev()
    }

    setLevel() {
        this.setCurrentLevel()
        let text = document.getElementById('level').textContent
        document.getElementById('level').textContent = 'Ваше текущие звание:' + ' ' + this.level.title
        let snus = document.getElementById('snus') 
        snus.style.backgroundImage = 'url(' + this.level.imageMark + ')'
        snus.onerror = function() {
            console.log('error')
        }
        console.log('setLevel')
    }

    getClickCount() {
        return this.clickCount
    }
    
    onClick() {
        this.clickCount += 1
    }

    save() {
       this.storage.saveData(this.clickCount) 
    }

    clear() {  
        this.storage.clear()
        this.clickCount = 0
    }

    clearUpgrades() {
        this.storage.clearUpgrades()
    }

    calculateCount() {
        let end = new Date()
        return end.value - this.start
    }

    saveStartTime() {
        this.storage.setStartTime(new Date().value)
    }

    onFirst(){
        
        let board = new Board()
        let f = "Привет, ты попал на снюсовую иглу. Теперь ты обязан собирать паки чтобы выжить. Открывая шайбу ты получаешь 1 пак. Покупай друзей в магазине, за паки, они будут приносить тебе прибыль"
        board.writeText(f)
        
        
        if(this.isFirst == null || this.isFirst === 'false' && this.firstClick < 10){
            this.tutorial.style.visibility = 'visible'
            this.storage.setIsFirst('false')  
            
        }else{
            this.tutorial.style.visibility = 'hidden'
            board.hide()
        }
    }



    toString(){
        return 'game:' + this.clickCount
    }

    updateCounter(counter) {
        this.setLevel()
        counter.textContent = this.clickCount
        this.storage.setFirstClick(this.clickCount)
        let max = document.getElementById("max")
        if (this.clickCount >= this.storage.getMaxCount()){
            this.storage.setMaxCount(this.clickCount)
            max.textContent = this.storage.getMaxCount()    
        }
        if (this.clickCount >= 10) {
            tutorial.style.display = 'none'
        }
    }

    buyUpgrade(price){
        if (this.clickCount >= price) {
            this.clickCount -= price
        }else{
            throw new Error("Недостаточно средств")
        }
    }

    showOnNotEnoughMoney() {
        let not_enough_money_message = document.getElementById("not_enough_money")
        not_enough_money_message.style.visibility = 'visible'
        anime({
                targets: '#not_enough_money',
                easing: 'linear',
                duration: 2000,
                delay: 3000,
                complete: function(){
                    not_enough_money_message.style.visibility = 'hidden'
                }
            })   
    }
}





window.onunload = function() {
    game.save()
    game.saveStartTime()
}

let game = new Game()

let store = new Store(game)
let snusClick = document.getElementById('snus')
let counter = document.getElementById('counter')
let clear = document.getElementById('clear')
let tutorial = document.getElementById('tutorial')
let keyDowns = []

game.init(counter, tutorial)
game.initUpgrades()
game.updateCounter(counter)


console.log(game.storage.getIsFirst())

clear.addEventListener('click', function click(event) {
    if (confirm("Вы уверенны что хотите удалить все паки?")){
        game.clearUpgrades()
        game.clear()    
        game.updateCounter(counter)
    }

})
let anim = anime({
    targets: '#tutorial',
    translateX: -490,
    easing: 'linear',
    duration: '800',
    complete: function(anim) {
        let anim1 = anime({
            targets: '#tutorial',
            direction: 'alternate',
            translateX: '-500px',
            loop: true
        })
    }
  });
snusClick.addEventListener('click', function click(event){
    game.onClick()
    game.updateCounter(counter)
    game.save()
})

document.addEventListener('keydown', function(event){
    keyDowns.push(event.key)
   
})

document.addEventListener('keyup', function(event){
    index = keyDowns.indexOf(event.key)
    keyDowns.splice(index)
   
})
man = document.getElementById('man')
man.addEventListener('click', function(){
    if(game.clickCount >= 500){
        man.style.visibility = 'hidden'
    }else{
        alert('Мужика можно убрать за писот(500) паков')
    }
})


