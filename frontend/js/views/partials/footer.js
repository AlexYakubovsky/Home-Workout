import Component from '../../views/component';

class Footer extends Component {
    render() {
        return new Promise(resolve => {
            let fullDate = new Date();

            resolve(`
                <p>Якубовский Александр, IT Academy, ${fullDate.getFullYear()}</p>
            `);
        });
    }
}

export default Footer;