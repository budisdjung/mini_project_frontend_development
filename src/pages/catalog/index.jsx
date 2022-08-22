import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import Header from "../../component/header";

export default function CatalogPages() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 0,
        name: "apel",
        quantity: 10,
        price: "20,000",
        naration: "some fresh fuji apple",
        picture:
          "https://images.tokopedia.net/img/cache/900/hDjmkQ/2020/8/10/ef40f634-37c6-44de-ac80-9d04142c1be9.png",
      },
      {
        id: 1,
        name: "jeruk",
        quantity: 50,
        price: "25,000",
        naration: "some fresh mandarin orange",
        picture:
          "https://images.tokopedia.net/img/cache/900/hDjmkQ/2021/5/19/60493896-9a22-4758-aa2d-32c46fb4b000.png",
      },
    ];
    setProductList(dummyData);
  }, []);

  return (
    <div style={{ margin: "10px 100px" }} className="catalog-pages">
      <Header />
      <Breadcrumb listTag="div">
        <BreadcrumbItem href="#" tag="a">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="#" tag="a">
          Library
        </BreadcrumbItem>
        <BreadcrumbItem href="#" tag="a">
          Data
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          Product Catalog
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Button outline color="success">
        Get All Product
      </Button>
      &nbsp; &nbsp;
      <Button outline color="info">
        Get By ID
      </Button>
      <br />
      <br />
      <Row>
        <Col>
          {productList.map((row, index) => (
            <Card
              body
              color="dark"
              inverse
              style={{
                width: "18rem",
              }}
            >
              <img alt={row.name} src={row.picture} />
              <CardBody>
                <CardTitle tag="h5">{row.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Price : Rp {row.price}.-
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  In Stock: &nbsp;{row.quantity}
                </CardSubtitle>
                <CardText>{row.naration}</CardText>
                <Button>Add to cart</Button>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
}
