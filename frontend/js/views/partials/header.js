import Component from '../../views/component';

class Header extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <p class="header-time"></p>
                <h1>ТРЕНИРОВКИ ДОМА</h1>
                <p class="header-day"></p>
            `);
        });
    }

    afterRender() {
        const headerTime = document.getElementsByClassName('header-time')[0],
            headerDate = document.getElementsByClassName('header-day')[0],
            days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];


        setInterval(() => {
            const fullDate = new Date(),
                hours = fullDate.getHours(),
                minutes = fullDate.getMinutes(),
                seconds = fullDate.getSeconds(),
                day = fullDate.getDate();

            headerTime.innerHTML = '';
            headerTime.innerHTML = `${this.getCorrectTime(hours)} : ${this.getCorrectTime(minutes)} : ${this.getCorrectTime(seconds)}`;
            headerDate.innerText = '';
            headerDate.innerText = (`${days[fullDate.getDay()]}, ${this.getCorrectTime(day)} ${months[fullDate.getMonth()]}`).toUpperCase();
        },1000);
    }

    getCorrectTime(currentTime) {
        return (currentTime < 10) ? `0${currentTime}` : currentTime;
    }
}

export default Header;