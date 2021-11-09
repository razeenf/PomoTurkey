class DadJokes {
    jokeElement: HTMLDivElement;
    // to prevent unnecessary calls to api
    loading: boolean = false;
    constructor() {
        this.jokeElement = <HTMLDivElement>document.getElementById('jokeElement')!;
        this.attachListeners();
    }

    attachListeners() {
        (<HTMLButtonElement>document.querySelector('#dj-btn'))!.addEventListener('click', this.newJoke);
    }

    @autobind
    newJoke() {
        if (this.loading) return;
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

const dadJokes = new DadJokes();