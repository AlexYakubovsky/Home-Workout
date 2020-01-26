import Component from '../../views/component';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1>Добро пожаловать!</h1>                   
                    <p>Это приложение обеспечит вас ежедневными тренировками для всех ваших основных групп мышц.<br>
                        Всего за несколько минут в день вы можете нарастить мышцы и заниматься фитнесом дома, не посещая тренажерный зал.<br>
                        Не нужно никакого оборудования или тренера, все упражнения могут выполняться только с вашим весом.<br>
                        В приложении есть тренировки для пресса, груди, ног, рук, плеч и спины.</p>
                </div>
            `);
        });
    }
}

export default About;