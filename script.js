'use strict'

let closure = (function() {
    let endSetInterval, endBreakSetInterval, tDifference, bDifference
    let timer = 1500
    let breakTimer = 300

    return {
        timerInc: function() {
            timer += 60
            if ( timer > 3601) timer = 3600           
            document.getElementById('timer').innerHTML =
                this.timerString() 
        },
        timerDec: function() {
            timer -= 60
            if ( timer < 62) timer = 60
            document.getElementById('timer').innerHTML =
                this.timerString()    
        },
        timerString: function() {
            return String( Math.floor( timer / 60 )) + ":" + 
            timerZeroes( Math.floor( timer % 60 ))
        },
        timerValue: function() { 
            return timer
        },
        breakInc: function() {
            breakTimer += 60
            if ( breakTimer > 1801) breakTimer = 1800           
            document.getElementById('breakTimer').innerHTML =
                this.breakString() 
        },
        breakDec: function() {
            breakTimer -= 60
            if ( breakTimer < 62) breakTimer = 60
            document.getElementById('breakTimer').innerHTML =
                this.breakString()    
        },
        breakString: function() {
            return String( Math.floor( breakTimer / 60 )) + ":" + 
            timerZeroes( Math.floor( breakTimer % 60 ))
        },
        breakValue: function() { 
            return breakTimer
        }
    }
})()

document.getElementById('timer').innerHTML = closure.timerString()
document.getElementById('breakTimer').innerHTML = closure.breakString()


function startTimer(timer = closure.timerValue()) {
    let startT = new Date().getTime()

    closure.endSetInterval = setInterval(countDown, 500)

    function countDown() {
        let currT = new Date()
        closure.tDifference = currT.getTime() - startT

        closure.tDifference = timer - closure.tDifference/1000

        if ( closure.tDifference > .5 ) {
            document.getElementById('timer').innerHTML =
                String( Math.floor( closure.tDifference / 60 )) + ":" +
                timerZeroes( Math.floor( closure.tDifference % 60 ))
        }
        else {
            var chime = "sounds/solemn.mp3"
                // use for fCC https://s3.amazonaws.com/freecodecamp/simonSound2.mp3           
            var audio = new Audio(chime)
            audio.play()    
            
            clearInterval(closure.endSetInterval)

            document.getElementById('timer').innerHTML =
                String( Math.floor( closure.timerValue() / 60 )) + ":" +
                timerZeroes( Math.floor( closure.timerValue() % 60 )) 
    
            breakTimer()
        }

    }
    setButtons('none', 'none', 'block', 'block', 'hidden')
}

function breakTimer(breakTime = closure.breakValue()) {
    let startT = new Date().getTime()

    closure.endBreakSetInterval = setInterval(breakCountDown, 500)

    function breakCountDown() {
        let currT = new Date()
        closure.bDifference = currT.getTime() - startT

        closure.bDifference = breakTime - closure.bDifference/1000

        if ( closure.bDifference > .4 ) {
            document.getElementById('breakTimer').innerHTML =
                String( Math.floor( closure.bDifference / 60 )) + ":" +
                timerZeroes( Math.floor( closure.bDifference % 60 ))
        }
        else {
            var chime = "sounds/serious-strike.mp3"
                // use for fCC https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
            var audio = new Audio(chime)
            audio.play()  

            clearInterval(closure.endBreakSetInterval)

            document.getElementById('breakTimer').innerHTML =
                String( Math.floor( closure.breakValue() / 60 )) + ":" +
                timerZeroes( Math.floor( closure.breakValue() % 60 ))  
                
            startTimer()
        }

    }
    //setButtons('none', 'none', 'block', 'block', 'hidden')
}

function timerZeroes(num) {
    num = String(num)
    if (num.length < 2) num = '0' + num
    return num
}

function stopTimer(rst = '') {
    clearInterval(closure.endSetInterval)
    clearInterval(closure.endBreakSetInterval)    
    if (rst) {
        document.getElementById('timer').innerHTML =
            closure.timerString()
        document.getElementById('breakTimer').innerHTML =
            closure.breakString()            
        setButtons('block', 'none', 'none', 'none', 'visible')
    }
    else {
        setButtons('none', 'block', 'none', 'block', 'hidden')
    }
}

function resumeTimer() {
    setButtons('none', 'none', 'block', 'block', 'hidden')

    if ( closure.tDifference > .1) {
        startTimer(closure.tDifference)
    }
    else {
        breakTimer(closure.bDifference)
    }
}

function setButtons(s, rsm, stp, rst, chg) {
    document.getElementById('start').style.display = s
    document.getElementById('resume').style.display = rsm
    document.getElementById('stop').style.display = stp
    document.getElementById('reset').style.display = rst
    let x = document.getElementsByClassName('chgTimer')
    for ( let i of x ) {
        i.style.visibility = chg
    }
}