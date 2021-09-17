import {useRef, useState} from "react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import useScroll from "@/hooks/useScroll";
import './Posts.scss';

const Posts = () => {

  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const debounceSearch = useDebounce(search, 1000);
  const [page, setPage] = useState(1);
  const limit = 20;
  const parentRef = useRef();
  const childRef = useRef();


  const fetchList = (limit, page) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
      .then(function (response) {
        setList([...list, ...response.data]);
        setPage(page + 1);
      })
      .catch(function (error) {
        console.log(error);
      })

  };

  useScroll(parentRef, childRef, () => fetchList(limit, page));

  function search(query){
    const url = query ? `https://jsonplaceholder.typicode.com/posts?id=${query}` : 'https://jsonplaceholder.typicode.com/posts'
    axios.get(url)
      .then(function (response) {
        setList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const onChange = e => {
    setSearchValue(e.target.value);
    debounceSearch(e.target.value)
  };

  return (
    <div className="Posts">

      <input type="text" value={searchValue} onChange={onChange} placeholder='search by id'/>

      <div className="lists" ref={parentRef} style={{maxHeight: '90vh', overflow: 'auto'}}>
        {list.map(item =>
          <div key={item.id} style={{border: '1px solid red', marginBottom: 10}}>
            <h5>{item.title}</h5>
            <p>{item.body}</p>
          </div>
        )}
        <div ref={childRef} style={{background: 'red', height: 20}}/>
      </div>
    </div>
  );
};

export default Posts;