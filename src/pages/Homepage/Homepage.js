import AdditionalBlock from "@/components/AdditionalBlock";
import excelIcon from "@/assets/images/excel.svg";
import img from "@/assets/images/img.jpeg";
import csvFile from "@/assets/files/export.csv";
import useInput from "@/hooks/useInput";

const Homepage = () => {
  const inputValue = useInput()
  return (
    <div className='Homepage'>
      <AdditionalBlock/>
      <input type="text" {...inputValue}/>
      eqwefd22222222222sfdsdddffffwer wer werwerewrew
      fffff321321
      <img src={img} alt=""/>
      <img src={excelIcon} alt=""/>
      <img src={excelIcon} alt=""/>
      <img src={excelIcon} alt=""/>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, quis saepe? Explicabo impedit numquam perferendis provident sed sit tempora ut vel veniam voluptas. Eos numquam perspiciatis possimus praesentium quasi quibusdam!</p>
      <pre> {JSON.stringify(csvFile, null, 2)}</pre>
    </div>
  )
};

export default Homepage;