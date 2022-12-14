import React, { useState, useEffect } from "react";
import { kontenbase } from "../../config/base";

export default function UpdateProduct({ update, setUpdate, id }) {
  const [preview, setPreview] = useState(null);
  const [alertI, setAlertI] = useState();

  const [alert2, setAlert2] = useState();

  const [nameUrl, setNameUrl] = useState();
  const [img, setImg] = useState("");
  const [addProduct, setAddProduct] = useState({
    name: "",
    price_buy: "",
    price_sell: "",
    image: "",
    notes: "",
    stok: "",
  });

  useEffect(() => {
    const findProduct = async () => {
      try {
        const { data } = await kontenbase.service("Products").getById(id);
        // setData(response.data.data);
        setAddProduct({
          name: data.name,
          price_buy: data.price_buy,
          price_sell: data.price_sell,
          image: data.image,
          notes: data.notes,
          stok: data.stok,
        });
        // setPreview(response.data.data.image);
      } catch (e) {
        console.log(e.message);
      }
    };
    findProduct();
  }, []);

  const { name, price_buy, image, notes, stok, price_sell } = addProduct;

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const pricenew = parseInt(price_buy);
      const price2new = parseInt(price_sell);

      const { data1 } = await kontenbase.service("posts").find({
        where: { name: name },
      });

      if (data1) {
        setAlert2(
          <div className="w-full bg-red-500 text-center py-1 rounded-lg text-white">
            nama sudah tersedia, gunakan nama lain!
          </div>
        );
      } else {
        const { data, error: ErrorProfile } = await kontenbase
          .service("Products")
          .updateById(id, {
            name,
            notes,
            image: img,
            stok,
            price_buy: pricenew,
            price_sell: price2new,
          });

        if (ErrorProfile) {
          alert("Maksimal gambar 100Kb");
          return;
        } else {
          alert(
            "berhasil UPDATE DATA " + data.name + "refresh halaman untuk update"
          );
          delay(500);
          setUpdate(!update);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const { data, error: uploadError } = await kontenbase.storage.upload(file);

    if (uploadError) {
      alert("Failed to change image profile");
      return;
    }
    if (data.size <= 100000) {
      setImg(data?.url);
      setAlertI();
    } else {
      setAlertI(
        <div className="w-full bg-red-500 text-center py-1 rounded-lg text-white">
          Ukuran gambar harus kurang dari 100Kb
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 opacity-50 fixed z-20"></div>
      <div className="bg-slate-200 w-[45rem] rounded-lg px-4 py-8 shadow-lg fixed z-30 top-16 left-1/2 -ml-80">
        <div
          className="cursor-pointer rounded-full bg-orange-500 text-white inline px-4 py-2 absolute -top-3 -right-3 font-bold"
          onClick={() => setUpdate(!update)}
        >
          X
        </div>
        <div className="text-2xl font-bold mb-3 text-orange-500">
          Update Product
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 mt-6"
        >
          {alertI}
          {alert2}
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            className="bg-white rounded-md border-none focus:ring-orange-600"
            placeholder="Title"
          />
          <input
            type="file"
            onChange={handleChangeImage}
            placeholder={image}
            name="image"
            className="bg-white rounded-md"
          />
          <textarea
            name="notes"
            id="notes"
            onChange={handleChange}
            value={notes}
            className="bg-white rounded-md border-none focus:ring-orange-500 w-full h-40"
            placeholder="Description"
          ></textarea>
          <input
            type="number"
            name="stok"
            onChange={handleChange}
            value={stok}
            className="bg-white rounded-md border-none focus:ring-orange-500"
            placeholder="Stok"
          />
          <input
            type="number"
            name="price_buy"
            onChange={handleChange}
            value={price_buy}
            className="bg-white rounded-md border-none focus:ring-orange-500"
            placeholder="Price exam: 5000000"
          />
          <input
            type="number"
            name="price_sell"
            onChange={handleChange}
            value={price_sell}
            className="bg-white rounded-md border-none focus:ring-orange-500"
            placeholder="Sell price exam: 6000000"
          />
          <button className="w-3/4 m-auto py-2 bg-orange-500 rounded-md font-bold text-white">
            {" "}
            Upload{" "}
          </button>
        </form>
      </div>
    </>
  );
}
