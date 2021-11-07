"use strict";
class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();
        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };
        this.remainingSeconds = 0;
        this.interval = null;

        this.session = 1;
        this.worktime = null;

        this.ifTimerAlreadyRunning((timeRemaining) => {
            this.remainingSeconds = timeRemaining;
            this.start();
        });
        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            }
            else {
                this.stop();
            }
        });
        this.el.reset.addEventListener("click", () => {
            if(this.session <=1){
                const inputMinutes = Number(prompt("Enter number of minutes for work session:"));
                this.worktime = inputMinutes;
            }
            // this.session ++;
            if (this.worktime == NaN)
                return;
            console.log((this.session % 5) ==1);
            console.log((this.session % 5) ===1);
            console.log(this.session);
            if((this.session % 5) ==0){
                this.session ++;
                this.stop();
                this.remainingSeconds = 5 * 60;
                this.updateInterfaceTime();
            }
            else{
                if(this.worktime < 60) {
                this.session ++;
                this.stop();
                this.remainingSeconds = this.worktime * 60;
                this.updateInterfaceTime();
                }
            }
               
           
        });
    }
    ifTimerAlreadyRunning(callbackFn) {
        // @ts-ignore
        chrome.storage.local.get(['timerRemainingSeconds'], function (result) {
            const timerRemainingSeconds = result.timerRemainingSeconds;
            if (timerRemainingSeconds == null || timerRemainingSeconds == undefined)
                callbackFn(0);
            else
                callbackFn(timerRemainingSeconds);
        });
    }
    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        }
        else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }
    start() {
        if (this.remainingSeconds === 0)
            return;
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if (this.remainingSeconds === 0) {
                this.stop();
            }
            console.log(this.interval);
            console.log(this.session);
        }, 1000);
        this.updateInterfaceControls();
    }
    stop() {
        // @ts-ignore
        chrome.storage.local.remove("timerRemainingSeconds");
        if (this.interval != null)
            clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }
    static getHTML() {
        return `
                <span class ="ui">
                  <span class ="clock">
                    <span class="timer__part timer__part--minutes">00</span>
                    <span class="timer__part">:</span>
                    <span class="timer__part timer__part--seconds">00</span>
                  </span>
                  <span class="buttons">
                    <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                        <span class="material-icons">play_arrow</span>
                    </button>
                    <button type="button" class="timer__btn timer__btn--reset">
                        <span class="material-icons">restart_alt</span>
                    </button>
                  </span>
                </span>
            `;
    }
    
}
const timer = new Timer(document.querySelector(".timer"));
window.onblur = function () {
    // @ts-ignore
    chrome.storage.local.set({ "timerRemainingSeconds": timer.remainingSeconds });
};
