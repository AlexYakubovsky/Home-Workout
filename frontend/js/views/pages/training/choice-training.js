import Component from '../../../views/component';

import Requests from '../../../models/requests';

class ChoiceTraining extends Component {
    constructor() {
        super();

        this.model = new Requests();
    }

    getData() {
        return new Promise(resolve => this.model.getTrainingList().then(trainings => resolve(trainings)));
    }

    render(trainings) {
        const pro = trainings.slice(0, 5),
            low = trainings.slice(5, 10);

        return new Promise(resolve => {
            resolve(`
                <div class="choice-training">
                    <div class="level">
                        <img class="training-image" src="styles/img/pro/pro.png" alt="pro">
               	        ${pro.map(training => this.getTrainingHTML(training)).join('\n ')}
                    </div>

                    <div class="level">
                        <img class="training-image" src="styles/img/low/low.png" alt="pro">       
                         	${low.map(training => this.getTrainingHTML(training)).join('\n ')}
                    </div>
                </div>
            `);
        });
    }

    getTrainingHTML(training) {
        const {id, icon, title, time} = training;

        return `
            <div class="training" data-id="${id}">
                <img class="training-icon" src="${icon}" alt="icon">
                <a class="training-link" href="#/training/${id}">
                <p>${title}<br><span class="training-time">${time}</span>
                    <i class="fas fa-arrow-circle-right"></i></p>
                </a>
            </div>
        `;
    }
}

export default ChoiceTraining;