import Component from '../../../views/component';

import Error404 from '../../../views/pages/error404';

import Requests from '../../../models/requests';

class Exercise extends Component {
    constructor() {
        super();

        this.model = new Requests();
    }

    getData() {
        return new Promise(resolve => this.model.getExercises(this.request.id).then(training => {
            this.training = training;

            resolve(training);
        }));
    }

    render(training) {
        return new Promise(resolve => {
            let html;

            if (Object.keys(training).length) {
                const {exercises} = training;

                html = `
                    <div class="exercise">
                        <div class="exercise-action">
                            <div class="exercise-current">
                                <div class="current-image">                  
                                    <img class="exercise-image" src="${exercises[0].image}" alt="image">
                                    <h1 class="exercise-ready"></h1>
                                </div>
                                
                                <div class="exercise-description">
                                     <p class="current-title">${exercises[0].title}</p> 
                                     ${this.currectExercise(exercises[0])}
                                </div>
                            </div>                            
                        </div>
                       
                        <div class="exercise-button">
                            <button class="button-back"><i class="fas fa-angle-left"></i></button>
                    		    <button class="button-next"><i class="fas fa-angle-right"></i></button>
                        </div>
                    </div>                    
				        `;
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }

    currectExercise(exercises) {
        const {time, number} = exercises;

        return ('time' in exercises) ? `<p>00:<span class="exercise-seconds">${time}</span></p>` : `<p>x${number}</p>`;
    }

    removeReady(time, exerciseReady, buttonNext, i, exercises, exerciseAction) {
        let timerId = setInterval(() => {
            exerciseReady.innerText = time;

            if (time === 0) {
                clearInterval(timerId);
                exerciseReady.remove();
                this.calculateLeadTime();
                this.sortExercises(buttonNext, this.i, exercises, exerciseAction);
            }

            --time;
        }, 1000);
    }

    sortExercises(buttonNext, i, exercises, exerciseAction) {
        const {time, number} = exercises[i];

        if ('time' in exercises[i]) {
            this.timerExercises(time, buttonNext, this.i, exercises, exerciseAction);

            return `<p>00:<span class="exercise-seconds">${time}</span></p>`;
        } else {
            return `<p>x${number}</p>`;
        }
    }

    timerExercises(time, buttonNext, i, exercises, exerciseAction) {
        buttonNext.style.display = 'block';

        this.idTimerExercise = setInterval(() => {
            const seconds = document.getElementsByClassName('exercise-seconds')[0];
            --time;

            try {
                seconds.innerText = this.getCorrectSeconds(time);
            } catch (error) {
                clearInterval(this.idTimerExercise);
            }

            if (time === 0) {
                clearInterval(this.idTimerExercise);
                this.userRest(buttonNext, this.i, exercises, exerciseAction);
            }
        }, 1000);
    }

    getCorrectSeconds(time) {
        return (time < 10) ? `0${time}` : time;
    }

    afterRender(training) {
        const exerciseReady = document.getElementsByClassName('exercise-ready')[0],
            exerciseAction = document.getElementsByClassName('exercise-action')[0],
            buttonBack = document.getElementsByClassName('button-back')[0],
            buttonNext = document.getElementsByClassName('button-next')[0],
            {exercises} = training;
        this.i = 0;

        buttonNext.style.display = 'none';

        buttonNext.addEventListener('click', () => this.userRest(buttonNext, this.i, exercises, exerciseAction));
        buttonBack.addEventListener('click', () => this.redirectToTrainingInfo());
        (() => this.removeReady(5, exerciseReady, buttonNext, this.i, exercises, exerciseAction))();
    }

    userRest(buttonNext, i, exercises, exerciseAction) {
        buttonNext.style.display = 'none';
        clearInterval(this.idTimerExercise);

        this.i = ++i;

        if (i < exercises.length) {
            exerciseAction.innerHTML = '';
            exerciseAction.innerHTML = `
                <div class="rest">
                    <div class="rest-time">
                        <h1>Отдых</h1>
                        <p>00:<span class="rest-seconds">30</span></p>
                        <button class="button-skip">ПРОПУСТИТЬ</button>
                        <button class="button-add">20 СЕКУНД</button>
                    </div>
               
                    <div class="rest-next">
                        <img class="rest-image" src="${exercises[i].image}" alt="image">
                        <p>Следующее ${this.i+1}/${exercises.length}</p>
                        <p>${exercises[i].title}</p>
                        <p>${this.currectExercise(exercises[i])}</p>
                    </div>
                </div>
            `;

            this.timerRest(30, buttonNext, this.i, exercises, exerciseAction);

            const buttonSkip = document.getElementsByClassName('button-skip')[0],
                buttonAdd = document.getElementsByClassName('button-add')[0];

            buttonSkip.addEventListener('click', () => {
                clearInterval(this.idTimerRest);
                this.nextExercise(buttonNext, this.i, exercises, exerciseAction);
            });

            buttonAdd.addEventListener('click', () => {
                clearInterval(this.idTimerRest);
                this.timerRest(21, buttonNext, i, exercises, exerciseAction);
            });

        } else {
            this.showCompliments(buttonNext, exercises, exerciseAction);
        }
    }

    timerRest(time, buttonNext, i, exercises, exerciseAction) {
        this.idTimerRest = setInterval(() => {
            const seconds = document.getElementsByClassName('rest-seconds')[0];
            --time;

            try {
                seconds.innerText = this.getCorrectSeconds(time);
            } catch (error) {
                clearInterval(this.idTimerRest);
            }

            if (time === 0) {
                clearInterval(this.idTimerRest);
                this.nextExercise(buttonNext, this.i, exercises, exerciseAction);
            }
        }, 1000);
    }

    nextExercise(buttonNext, i, exercises, exerciseAction) {
        const {image, title} = exercises[i];

        buttonNext.style.display = 'block';

        exerciseAction.innerHTML = '';
        exerciseAction.innerHTML = `
            <div class="current-image">                  
                <img class="exercise-image" src="${image}" alt="image">
            </div>   
                                
            <div class="exercise-description">
                <p class="current-title">${title}</p> 
                ${this.sortExercises(buttonNext, this.i, exercises, exerciseAction)}
            </div>
        `;
    }

    showCompliments(buttonNext, exercises, exerciseAction) {
        buttonNext.style.display = 'none';
        clearInterval(this.idLeadTime);

        exerciseAction.innerHTML = `
            <div class="compliment">
                <div class="compliment-title">
                    <h1>Тренировка выполнена!</h1>
                    <p>${this.training.title}</p>
                </div>
                
                <div class="compliment-about">
                    <p>Время<br><span class="info-time"><span class="total-minutes">00</span>:<span class="total-seconds">00</span></span></p>
                    <p>Упраженения<br><span class="info-time">${exercises.length}</span></p>
                </div>
            </div>
        `;

        const totalMinutes = document.getElementsByClassName('total-minutes')[0],
            totalSeconds = document.getElementsByClassName('total-seconds')[0];

        totalMinutes.innerText = `${this.getCorrectSeconds(this.mmCounter)}`;
        totalSeconds.innerText = `${this.getCorrectSeconds(this.ssCounter)}`;
    }

    calculateLeadTime() {
        this.ssCounter = 0;
        this.mmCounter = 0;

        this.idLeadTime = setInterval(() => {
            ++this.ssCounter;

            if (this.ssCounter === 60) {
                this.ssCounter = 0;

                ++this.mmCounter;

                if (this.mmCounter === 60) {
                    clearInterval(this.idLeadTime);
                }
            }
        }, 1000);

    }

    redirectToTrainingInfo() {
        if (confirm('Вы уверены?')) {
            clearInterval(this.idTimerExercise);
            clearInterval(this.idTimerRest);
            clearInterval(this.idLeadTime);

            location.hash = `#/training/${this.training.id}`;
        }
    }
}

export default Exercise;