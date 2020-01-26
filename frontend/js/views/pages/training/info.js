import Component from '../../../views/component';

import Error404 from '../../../views/pages/error404';

import Requests from '../../../models/requests';

class Info extends Component {
    constructor() {
        super();

				this.model = new Requests();
    }

		getData() {
				return new Promise(resolve => this.model.getTraining(this.request.id).then(training => resolve(training)));
		}

		render(training) {
				return new Promise(resolve => {
						let html;

						if (Object.keys(training).length) {
								const {id, title, time, exercises} = training;

								html = `
                    <div class="info">
                    		<div class="info-description">
                    				<h1 class="info-title">${title}</h1>
                    				<div class="info-about">
                    						<a class="info-link" href="#/training"><i class="fas fa-angle-left"></i></a>                    					
                    						<p>Время<br><span class="info-time">${time}</span></p>
                    						<p>Упраженения<br><span class="info-time">${exercises.length}</span></p>
                    						<a class="info-link" href="#/training/${id}/exercise"><i class="fas fa-angle-right"></i></a>        								
                    				</div>
												</div>
												
                    		<div class="info-exercise">
                    				${exercises.map(exercise => this.sortTrainingHTML(exercise)).join('\n ')}
												</div>		
                    </div>
								`;
						} else {
								html = new Error404().render();
						}

						resolve(html);
				});
		}

		sortTrainingHTML(exercise) {
				const {image, title, time, number} = exercise;

				if ('time' in exercise) {
						return `
								<div class="training">
										<img class="training-icon" src="${image}" alt="image">						
                		<p>${title}<br><span class="training-time">00:${time}</span></p>
								</div>
						`;
				}	else {
						return `
								<div class="training">
										<img class="training-icon" src="${image}" alt="image">						
                		<p>${title}<br><span class="training-time">x${number}</span></p>
								</div>
						`;
				}
		}
}

export default Info;