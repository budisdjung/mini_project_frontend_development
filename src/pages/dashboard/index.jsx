import React, { useState, useEffect } from "react";
import { Button, Table, Modal, ModalBody, ModalHeader } from "reactstrap";
import Header from "../../component/header";
import request from "../../request";
import FormDashboard from "./form";

export default function Dashboard() {
  const [productList, setProductList] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formUpdatedId, setFormUpdatedId] = useState(null);

  const handleCreateForm = () => {
    setFormType("Create");
    setFormVisible(true);
  };

  const handleUpdateForm = (id) => {
    setFormType("Update");
    setFormVisible(true);
    setFormUpdatedId(id);
  };

  const handleDelete = (id) => {
    request.delete(`/product/${id}`)
    .then (() => fetchData())
    .catch ((err) => alert(err))
  }

  const fetchData = async () => {
    await request.get('/product')
    .then(({ data }) => {
        setProductList(data);
    })
    .catch(err => alert(err));
  }

  useEffect(() => {
    fetchData()
  }, []);

  console.table({ formType, formVisible, formUpdatedId });
  
  return (
    <div style={{ margin: "0px 100px" }}>
      <Header></Header>
      <h3>Product List</h3>
      <br />
      <Button outline color="primary" onClick={() => handleCreateForm()}>
        + Add Product
      </Button>
      <br />
      <Table dark hover responsive size="md" striped width={200}>
        <thead>
          <tr>
            <th>No</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Naration</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((row, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.quantity}</td>
              <td>{row.price}</td>
              <td>{row.naration}</td>
              <td>{row.image}</td>
              <td>
                <Button
                  outline
                  color="warning"
                  onClick={() => handleUpdateForm(row.id)}
                >
                  Update
                </Button>
                &nbsp; &nbsp;
                <Button outline color="danger" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/*Modal Form*/}
      <Modal isOpen={formVisible} toggle={() => setFormVisible(!formVisible)}>
        <ModalHeader>{`Form ${formType} Product`}</ModalHeader>
        <ModalBody>
          <FormDashboard
            type={formType}
            refetch={fetchData}
            formUpdatedId={formUpdatedId}
            closeModal={() => setFormVisible(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}
