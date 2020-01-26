class Requests {
		getTrainingList() {
				return new Promise(resolve => {
						const xhr = new XMLHttpRequest();

						xhr.open('GET', 'http://localhost:3000/api/trainings', true);

						xhr.onload = () => {
								try {
										resolve(JSON.parse(xhr.response));
								} catch (error) {
										alert('При загрузке данных произошла ошибка.');
								}
						};

						xhr.send();
				});
		}

		getTraining(id) {
				return new Promise(resolve => {
						const xhr = new XMLHttpRequest();

						xhr.open('GET', `http://localhost:3000/api/training/${id}`, true);

						xhr.onload = () => {
								try {
										resolve(JSON.parse(xhr.response));
								} catch (error) {
										alert('При загрузке данных произошла ошибка.');
								}
						};

						xhr.send();
				});
		}

		getExercises(id) {
				return new Promise(resolve => {
						const xhr = new XMLHttpRequest();

						xhr.open('GET', `http://localhost:3000/api/training/${id}/exercise`, true);

						xhr.onload = () =>  {
								try {
										resolve(JSON.parse(xhr.response));
								} catch (error) {
										alert('При загрузке данных произошла ошибка.');
								}
						};

						xhr.send();
				});
		}
}

export default Requests;