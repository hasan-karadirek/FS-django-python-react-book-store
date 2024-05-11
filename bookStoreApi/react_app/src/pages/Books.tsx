import React, { useState } from "react";
import SearchBar,{SearchFormData} from "../components/SearchBar";
import useFetch from "../hooks/useFetch";
import ProductList from "../components/ProductList";

interface BookImage{
    book:number,
    image:string
}
export interface Book{
    id:number,
    isbn:string,
    env_no:number,
    title:string,
    author:string,
    publishng_house:string,
    language:string,
    cover:string,
    year:number,
    edition:string,
    category:string,
    condition_description:string,
    condition:string,
    price:string,
    status:string,
    tag:string[],
    images:BookImage[]
}
const Books: React.FC = () => {
    const [products,setProducts]=useState<Book[] | null>(null)
    const {isLoading,error,performFetch,cancelFetch}=useFetch("/book/",(res)=>{setProducts(res.data as Book[])})

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
      {isLoading ? "wait" : <ProductList products={products}/> }
    </>
  );
};

export default Books;
