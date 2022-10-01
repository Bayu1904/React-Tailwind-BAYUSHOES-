import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import AddProductModal from "../components/Modal/AddProductModal";
import Navbar from "../components/Navbar";
import { kontenbase } from "../config/base";
import { useNavigate } from "react-router-dom";
import UpdateProduct from "../components/Modal/UpdateProducts";
import Pagination from "../components/Pagination";
import Select from "react-select";

export default function ListProduct() {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage, setPostPage] = useState(5);
  const [userSelect, setUserSelect] = useState(null);
  const [productID, setProductID] = useState(null);

  useEffect(() => {
    const find = async () => {
      const { data, error } = await kontenbase.service("Products").find();
      setProducts(data);

      if (error) {
        console.log(error);
        return;
      }
    };
    const Bel = async () => {
      const { data, error } = await kontenbase.service("Products").find({
        where: { name: userSelect },
      });
      setProductID(data);

      if (error) {
        console.log(error);
        return;
      }
    };
    Bel();
    find();
  }, [userSelect]);

  let handleDelete = async (id) => {
    let person = prompt("Input 'DELETE' for Delete Product", "DELETE");
    if (person === "DELETE") {
      await kontenbase.service("Products").deleteById(id);
      alert("Product Berhasil di delete, refresh kembali halaman anda");
    }
    navigate("/ListProduct");
  };
  const [Comp, setComp] = useState();
  let handleUpdate = async (id) => {
    setUpdate(!update);
    setComp(id);
  };

  // get current
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;
  const currentPost = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Select
  const result = products?.map((data) => {
    return {
      label: data.name,
      value: data.name,
    };
  });
  const handleInputChange = (label) => {
    setUserSelect(label);
  };

  return (
    <>
      {add && <AddProductModal state={add} setState={setAdd} />}
      {update && (
        <UpdateProduct id={Comp} update={update} setUpdate={setUpdate} />
      )}
      <Navbar />
      <div className="w-3/4 m-auto mb-16">
        <div className="my-7 flex flex-row justify-between items-center">
          <div className="font-bold  text-4xl">List Product</div>
          <Select
            options={result.sort((a, b) => a.value.localeCompare(b.value))}
            onChange={(e) => handleInputChange(e.value)}
            className="w-52"
          ></Select>
          <div
            className="bg-orange-200 px-4 py-2 rounded-xl border-dashed border-2 border-orange-500 cursor-pointer hover:bg-orange-400 hover:text-white hover:border-white duration-300 transition-all"
            onClick={() => {
              setAdd(true);
            }}
          >
            Add Product
          </div>
        </div>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Product Title</Table.HeadCell>
            <Table.HeadCell>Product Image</Table.HeadCell>
            <Table.HeadCell>Desc</Table.HeadCell>
            <Table.HeadCell>Stok</Table.HeadCell>
            <Table.HeadCell>Price_buy</Table.HeadCell>
            <Table.HeadCell>Price_sell</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userSelect != null ? (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {productID[0]?.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img src={productID[0]?.image} alt="" className="w-24" />
                </Table.Cell>
                <Table.Cell>{productID[0]?.notes}</Table.Cell>
                <Table.Cell>{productID[0]?.stok}</Table.Cell>
                <Table.Cell>{productID[0]?.price_buy}</Table.Cell>
                <Table.Cell>{productID[0]?.price_sell}</Table.Cell>
                <Table.Cell>
                  <div
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                    onClick={() => handleUpdate(productID[0]?._id)}
                  >
                    Edit
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div
                    className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(productID[0]?._id)}
                  >
                    Delete
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              currentPost?.map((item, i) => (
                <Table.Row
                  key={i}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item?.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <img src={item?.image} alt="" className="w-24" />
                  </Table.Cell>
                  <Table.Cell>{item?.notes}</Table.Cell>
                  <Table.Cell>{item?.stok}</Table.Cell>
                  <Table.Cell>{item?.price_buy}</Table.Cell>
                  <Table.Cell>{item?.price_sell}</Table.Cell>
                  <Table.Cell>
                    <div
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Edit
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
        {userSelect == null && (
          <Pagination
            postsPerPage={postPage}
            totalPosts={products.length}
            paginate={paginate}
          />
        )}
      </div>
    </>
  );
}
