import React from "react";
import SearchBar,{SearchFormData} from "../components/SearchBar";
import useFetch from "../hooks/useFetch";


const Books: React.FC = () => {
    const {isLoading,error,performFetch,cancelFetch}=useFetch("/book/",(res)=>{console.log(res)})

    const handleSearchFormSubmit=(formData:SearchFormData)=>{
        performFetch()
    }
  return (
    <>
    <br/>
    <br/>
    <br/> 
    <br/>
    <br/>
      <SearchBar handleSearchFormSubmit={handleSearchFormSubmit}/>
    </>
  );
};

export default Books;
