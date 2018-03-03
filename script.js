let endSetInterval, tDifference

function startTimer(timer = 1501) {  // 25 minutes in seconds
    
    let startT = new Date()

    endSetInterval = setInterval(countDown, 500)

    function countDown() {
        let currT = new Date()
        tDifference = currT.getTime() - startT.getTime()

        tDifference = timer - tDifference/1000

        document.getElementById('timer').innerHTML =
            String(Math.floor(tDifference / 60)) + ":" +
            timerZeroes(Math.floor(tDifference % 60))
    }

    function timerZeroes(num) {
        num = String(num)
        if (num.length < 2) num = '0' + num
        return num
    }

    setButtons('none', 'none', 'block', 'block')
}

function stopTimer(rst = '') {
    clearInterval(endSetInterval)
    if (rst) {
        document.getElementById('timer').innerHTML = '25:00'
        setButtons('block', 'none', 'none', 'none')
    }
    else {
        setButtons('none', 'block', 'none', 'block')
    }
}

function resumeTimer() {
    startTimer(tDifference)
    setButtons('none', 'none', 'block', 'block')
}

function setButtons(s, rsm, stp, rst) {
    document.getElementById('start').style.display = s
    document.getElementById('resume').style.display = rsm
    document.getElementById('stop').style.display = stp
    document.getElementById('reset').style.display = rst
}