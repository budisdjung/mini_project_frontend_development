import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../request";

export default function ProductId() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const fetchDataById = useCallback(() => {
    request
      .get(`http://localhost:7777/product/${productId}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => alert(err));
  }, [productId]);

  useEffect(() => {
    fetchDataById();
  }, [productId, fetchDataById]);

  return (
    <>
      {product?.name}
      <br />
      {product?.quantity}
      <br />
      {product?.price}
    </>
  );
}
