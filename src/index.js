import ReactDOM from "react-dom"
import './index.scss';
import excelIcon from './assets/images/excel.svg'
import csvFile from './assets/files/export.csv';

const App = () => (
  <div className='app'>
    <img src={excelIcon} alt=""/>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, quis saepe? Explicabo impedit numquam perferendis provident sed sit tempora ut vel veniam voluptas. Eos numquam perspiciatis possimus praesentium quasi quibusdam!</p>
    <pre> {JSON.stringify(csvFile, null, 2)}</pre>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
