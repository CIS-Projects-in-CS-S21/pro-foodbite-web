import React, {  useState, useEffect} from "react";
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
    background-color:rgba(245,245,220,0.5);
    &:hover{
        background-color:rgba(125,125,125,1);
    }
`

export default function MenuEditForm( {show, closeShow, sendData, menuData}){
    const [menuObjectList, setMenuObjectList] = useState(menuData);
    const [menuList, setMenuList] = useState([]);

    useEffect( () => {
        for (let i = 0; i < menuObjectList.length; i++) {
            const element = menuObjectList[i];
            const theNewItem = <MenuItem id={"Menu"+i} >
                {element.name}<br/>
                {element.description}<br/>
                $
                {parseFloat(element.price).toFixed(2)}    
            </MenuItem>
            setMenuList(menuList => [...menuList, theNewItem]);
        }
    },[menuData])

    function addItemToList(){
        var itemName = document.getElementById("itemName");
        var itemPrice = document.getElementById("itemPrice");
        var itemDescription = document.getElementById("itemDescription");  
        
        const temp = {
            name:itemName.value,
            price:itemPrice.value,
            description:itemDescription.value
        }

        setMenuObjectList([...menuObjectList, temp]);

        var theNewItem = <MenuItem id={"Menu"+menuList.length} >
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
        console.log("end display", menuObjectList);
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
        sendData(menuObjectList);
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
                        onChange={menuFormik.handleChange} value ={menuFormik.values.itemName}
                        style={{marginBottom:10}}/>
                    <div>{menuFormik.errors.itemName ? menuFormik.errors.itemName : null}</div>

                    <Input type="number" id="itemPrice" step="0.01" min="0,01" placeholder="Item Price"
                        onChange={menuFormik.handleChange} value = {menuFormik.values.itemPrice}
                        style={{marginBottom:10}}/>
                    <div>{menuFormik.errors.itemPrice ? menuFormik.errors.itemPrice: null}</div>

                    <Input type="string" id="itemDescription" placeholder="Description of the item - optional"
                    style={{marginBottom:10}}/>

                    <LongButton type="submit" style={{marginBottom:10}}>Add item</LongButton>
                </form>
                <Group>

                    <LongButton id="done" onClick={readyForClose}>Done</LongButton>
                </Group>
            </Group>
        </Container>
    )
    

    

    
}