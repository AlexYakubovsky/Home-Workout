import Component from '../../views/component';

class Menu extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`     
                <a class="${!resource ? 'active' : ''}" href="/#/">
                    <i class="fas fa-user"><span class="menu-caption">Я</span></i>
                </a> 
                <a class="${resource === 'training' ? 'active' : ''}" href="/#/training">
                    <i class="fab fa-algolia"><span class="menu-caption">Тренировка</span></i>
                </a>
            `);
        });
    }
}

export default Menu;