"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class DadJokes {
    constructor() {
        // to prevent unnecessary calls to api
        this.loading = false;
        this.jokeElement = document.getElementById('jokeElement');
        this.attachListeners();
    }
    attachListeners() {
        document.querySelector('#dj-btn').addEventListener('click', this.newJoke);
    }
    newJoke() {
        if (this.loading)
            return;
        this.loading = true;
        this.jokeElement.innerHTML = 'Umm Thinking...';
        fetch('https://icanhazdadjoke.com/slack')
            .then(data => data.json())
            .then(jokeData => {
            this.loading = false;
            const jokeText = jokeData.attachments[0].text;
            this.jokeElement.innerHTML = `"${jokeText}"`;
        });
    }
}
__decorate([
    autobind
], DadJokes.prototype, "newJoke", null);
const dadJokes = new DadJokes();
