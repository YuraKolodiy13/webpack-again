import AdditionalBlock from "@/components/AdditionalBlock";
import excelIcon from "@/assets/images/excel.svg";
import csvFile from "@/assets/files/export.csv";

const Homepage = () => {
  return (
    <div className='Homepage'>
      <AdditionalBlock/>
      eqwefd22222222222sfdsdddffffwer wer werwerewrew
      fffff321321
      <img src={excelIcon} alt=""/>
      <img src={excelIcon} alt=""/>
      <img src={excelIcon} alt=""/>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, quis saepe? Explicabo impedit numquam perferendis provident sed sit tempora ut vel veniam voluptas. Eos numquam perspiciatis possimus praesentium quasi quibusdam!</p>
      <pre> {JSON.stringify(csvFile, null, 2)}</pre>
    </div>
  )
};

export default Homepage;