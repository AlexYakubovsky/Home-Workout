import Component from '../../views/component';

class Error404 extends Component{
    render() {
        return new Promise(resolve => {
            resolve(`                
                <h1 class="about">Здрасьте, приехали! Ошибка 404</h1>              
            `);
        });
    }
}

export default Error404;