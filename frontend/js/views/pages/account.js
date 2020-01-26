import Component from '../../views/component';

class Account extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1>Добро пожаловать!</h1>                   
                    <p>Тут будет статистика</p>
                </div>
            `);
        });
    }
}

export default Account;