import React, { createContext, useState, useEffect} from "react";
import {Group, LongButton, Input, Container} from "../../styles/FormElements"
import styled from "styled-components"
import { useFormik } from "formik"
import * as Yup from "yup"


const MenuList = styled.ul`
    display:grid;
    padding:0px;
    margin-top:50px;
    list-style:none;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

const MenuItem = styled.li`
    background-repeat:white;
    
    border:1px solid;
    border-radius:10px;
    margin-right:5px;
    &:hover{
        background-color:rgba(125,125,125,125);
    }
`

const TopPage = styled.div`
    z-index:2;
    align-items:center;
    justify-content:center;
    position:absolute;
    background-color:green;
    border-radius:5px;
    width:100%;
    margin-top:100px;
    visibility:visible;
`

export default function MenuEditForm( {show, closeShow, sendData, menuData}){

    const [menuList, setMenuList] = useState(menuData);
    
    function addItemToList(){
        var itemName = document.getElementById("itemName");
        var itemPrice = document.getElementById("itemPrice");
        var itemDescription = document.getElementById("itemDescription");  

        var theNewItem = <MenuItem id={menuList.length} >
            {itemName.value}<br/>
            {itemDescription.value}<br/>
            $
            {parseFloat(itemPrice.value).toFixed(2)}    
        </MenuItem>
        setMenuList(menuList => [...menuList, theNewItem]);
        menuFormik.values.itemName="";
        menuFormik.values.itemPrice="";
        menuFormik.values.itemDescription="";
        itemPrice.value = "";
        itemName.value = "";
        itemDescription.value ="";
    }

    const menuFormik = useFormik({
        initialValues:{
            itemName:"",
            itemPrice:"",
            itemDescription:"",
        },
        validationSchema: Yup.object({
            itemName:Yup.string()
                .required("Required"),
            itemPrice:Yup.number()
                .min(0.01,"Invalid price")
                .required("Required"),
            itemDescription:Yup.string(),
        }),

        onSubmit: addItemToList,
    });

    function readyForClose(){
        sendData(menuList);
        closeShow();
    }

    if(!show){
        return null;
    }
    return(
        <Container>
                <MenuList >
                    {menuList}
                </MenuList>
            <Group style={{justifyItems:"center", alignItems:"center"}}>
                <form onSubmit={menuFormik.handleSubmit}>
                    <Input type="string" id="itemName" placeholder="Item Name"
                        onChange={menuFormik.handleChange} value ={menuFormik.values.itemName}/>
                    <div>{menuFormik.errors.itemName ? menuFormik.errors.itemName : null}</div>
                    <br/>
                    <Input type="number" id="itemPrice" step="0.01" min="0,01" placeholder="Item Price"
                        onChange={menuFormik.handleChange} value = {menuFormik.values.itemPrice}/>
                    <div>{menuFormik.errors.itemPrice ? menuFormik.errors.itemPrice: null}</div>
                    <br/>
                    <Input type="string" id="itemDescription" placeholder="Description of the item - optional"/>
                    <LongButton type="submit">Add item</LongButton>
                </form>
                <Group>
                    <LongButton id="done" onClick={readyForClose}>Done</LongButton>
                </Group>
            </Group>
        </Container>
    )
    

    

    
}