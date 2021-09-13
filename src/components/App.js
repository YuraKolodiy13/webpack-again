import excelIcon from '@/assets/images/excel.svg'
import csvFile from '@/assets/files/export.csv';
import AdditionalBlock from "@/components/AdditionalBlock";

const App = () => {

  return (
    <div className='app'>
      <AdditionalBlock/>
      eqwefd22222222222sfds
      <img src={excelIcon} alt=""/>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, quis saepe? Explicabo impedit numquam perferendis provident sed sit tempora ut vel veniam voluptas. Eos numquam perspiciatis possimus praesentium quasi quibusdam!</p>
      <pre> {JSON.stringify(csvFile, null, 2)}</pre>
    </div>
  )
};

export default App;