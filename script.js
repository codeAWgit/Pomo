'use strict'
let endSetInterval, endBreakSetInterval, tDifference

let closure = (function() {
    let timer = 1500
    let breakTimer = 300

    return {
        timerIncMin: function() {
            timer += 60
            if ( timer > 3601) timer = 3600           
            document.getElementById('timer').innerHTML =
                this.timerString() 
        },
        timerDecMin: function() {
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
        breakIncMin: function() {
            breakTimer += 60
            if ( breakTimer > 1801) breakTimer = 1800           
            document.getElementById('breakTimer').innerHTML =
                this.breakString() 
        },
        breakDecMin: function() {
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

    endSetInterval = setInterval(countDown, 500)

    function countDown() {
        let currT = new Date()
        tDifference = currT.getTime() - startT

        tDifference = timer - tDifference/1000

        if ( tDifference > .1 ) {
            document.getElementById('timer').innerHTML =
                String( Math.floor( tDifference / 60 )) + ":" +
                timerZeroes( Math.floor( tDifference % 60 ))
        }
        else {
            //stopTimer('reset')
            clearInterval(endSetInterval)
            breakTimer()
        }

    }
    setButtons('none', 'none', 'block', 'block', 'hidden')
}

function breakTimer(breakTime = closure.breakValue()) {
    let startT = new Date().getTime()

    endBreakSetInterval = setInterval(breakCountDown, 500)

    function breakCountDown() {
        let currT = new Date()
        tDifference = currT.getTime() - startT

        tDifference = breakTime - tDifference/1000

        if ( tDifference > .1 ) {
            document.getElementById('breakTimer').innerHTML =
                String( Math.floor( tDifference / 60 )) + ":" +
                timerZeroes( Math.floor( tDifference % 60 ))
        }
        else {
            clearInterval(endBreakSetInterval)
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
    clearInterval(endSetInterval)
    clearInterval(endBreakSetInterval)    
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
    startTimer(tDifference)
    setButtons('none', 'none', 'block', 'block', 'hidden')
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