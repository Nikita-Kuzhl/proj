import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UslugiList = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    setLoading(true);

    const data = await fetch("/products");
    const dataJSON = await data.json();
    setProducts(dataJSON.products);

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    const timer =setInterval(()=>{
      if(localStorage.getItem('theme')==="true"){
        setTheme('f5f5f5')
      }else{
        setTheme("#ffffff")
      }
    },100)
    return () => clearTimeout(timer)
  }, []);

  const renderEmpty = () => (
    <Box sx={{ display: "flex", height: 600 }}>Нет данных</Box>
  );
  const renderSpinner = () => (
    <Box sx={{ display: "flex", height: 600, bgcolor:theme }}>
      <CircularProgress />
    </Box>
  );
  const renderInfo = () => (
    <Box
      sx={{
        height: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        flexWrap: "wrap",
        m: 5,
      }}
    >
      {products.map((list) => (
        <Link
          to={{ pathname: `/uslugi/item/${list.id}` }}
          state={list}
          key={list.id}
          style={{ textDecoration: "none" }}
        >
          <Typography variant="h5" sx={{ textDecoration: "none", mb: 5 }}>
            {list.name}
          </Typography>
        </Link>
      ))}
    </Box>
  );
  return (
    <>
      {loading && renderSpinner()}
      {!loading && products.length === 0 && renderEmpty()}
      {!loading && products.length > 0 && renderInfo()}
    </>
  );
};

export default UslugiList;
