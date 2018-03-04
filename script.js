'use strict'

let closure = (function() {
    let timer = 1140,   breakTimer = 60

    return {
        timerInc: function(x) {
            timer += x
            if ( timer < 61 ) timer = 60
            if ( timer > 3601 ) timer = 3600           
            document.getElementById('timer').innerHTML =
                this.timerString(timer) 
        },
        breakInc: function(y) {
            breakTimer += y
            if ( breakTimer < 62) breakTimer = 60
            if ( breakTimer > 1801) breakTimer = 1800
            document.getElementById('breakTimer').innerHTML =
                this.timerString(breakTimer) 
        },
        timerString: function(timer) {
            let num = String( Math.floor( timer % 60 ) )
            if (num.length < 2) num = '0' + num
        
            return String( Math.floor( timer / 60 )) + ":" + num
        },        
        timerValue: () => timer
        ,
        breakValue: () => breakTimer
    }
})()

document.getElementById('timer').innerHTML = 
    closure.timerString( closure.timerValue() )
document.getElementById('breakTimer').innerHTML = 
    closure.timerString( closure.breakValue() )


function startTimer(timer = closure.timerValue()) {
    let startT = new Date().getTime()

    closure.endSetInterval = setInterval(countDown, 500)

    function countDown() {
        closure.tDifference = new Date().getTime() - startT

        closure.tDifference = timer - closure.tDifference/1000

        if ( closure.tDifference > .5 ) {
            document.getElementById('timer').innerHTML =
                closure.timerString( closure.tDifference ) 
        }
        else {
            let chime = "sounds/solemn.mp3"         
            let audio = new Audio(chime)
            audio.play()    
            
            clearInterval(closure.endSetInterval)

            document.getElementById('timer').innerHTML =
                closure.timerString( closure.timerValue() )    

            breakTimer()
        }
    }
    setButtons('none', 'none', 'block', 'block', 'hidden')
}

function breakTimer(breakTime = closure.breakValue()) {
    let startT = new Date().getTime()

    closure.endBreakSetInterval = setInterval(breakCountDown, 500)

    function breakCountDown() {
        closure.bDifference = new Date().getTime() - startT

        closure.bDifference = breakTime - closure.bDifference/1000

        if ( closure.bDifference > .4 ) {
            document.getElementById('breakTimer').innerHTML =
                closure.timerString( closure.bDifference )    
        }
        else {
            var chime = "sounds/serious-strike.mp3"
            var audio = new Audio(chime)
            audio.play()  

            clearInterval(closure.endBreakSetInterval)

            document.getElementById('breakTimer').innerHTML =
                closure.timerString( closure.breakValue() )  
                
            startTimer()
        }
    }
}

function stopTimer(rst = '') {
    clearInterval( closure.endSetInterval )
    clearInterval( closure.endBreakSetInterval )    

    if (rst) {
        document.getElementById('timer').innerHTML =
            closure.timerString( closure.timerValue() )
        document.getElementById('breakTimer').innerHTML = 
            closure.timerString( closure.breakValue() )
        setButtons('block', 'none', 'none', 'none', 'visible')
    }
    else {
        setButtons('none', 'block', 'none', 'block', 'hidden')
    }
}

function resumeTimer() {
    setButtons('none', 'none', 'block', 'block', 'hidden')
    
    if ( closure.tDifference > .1) {
        startTimer( closure.tDifference )
    }
    else {
        breakTimer( closure.bDifference )
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