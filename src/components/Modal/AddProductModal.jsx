import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { kontenbase } from "../../config/base";

export default function AddProductModal({ state, setState }) {
  const navigate = useNavigate();
  const [alert2, setAlert2] = useState();
  const [alertI, setAlertI] = useState();
  const [preview, setPreview] = useState(null);
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
  const [data, setData] = useState("");

  const { name, price_buy, notes, stok, price_sell } = addProduct;

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
      const { data, error } = await kontenbase.service("Products").find({
        where: { name: addProduct.name },
      });
      setData(data);
      if (data.length > 0) {
        setAlert2(
          <div className="w-full bg-red-500 text-center py-1 rounded-lg text-white">
            Nama sudah tersedia, gunakan nama lain!
          </div>
        );
      } else {
        const { data, error: ErrorProfile } = await kontenbase
          .service("Products")
          .create({
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
            "berhasil menambahkan Product " +
              ", refresh halaman anda untuk update!"
          );
          delay(100);
          setState(!state);
        }
      }

      // regClose();
      // navigate("/");
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
          onClick={() => setState(false)}
        >
          X
        </div>
        <div className="text-2xl font-bold mb-3 text-orange-500">
          ADD Product
        </div>
        {alert2}
        {alertI}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 mt-6"
        >
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            className="bg-white rounded-md border-none focus:ring-orange-600"
            placeholder="Title"
            required
          />
          <input
            type="file"
            onChange={handleChangeImage}
            name="image"
            className="bg-white rounded-md"
            required
          />
          <textarea
            name="notes"
            id="notes"
            onChange={handleChange}
            value={notes}
            className="bg-white rounded-md border-none focus:ring-orange-500 w-full h-40"
            placeholder="Description"
            required
          ></textarea>
          <input
            type="number"
            name="stok"
            onChange={handleChange}
            value={stok}
            className="bg-white rounded-md border-none focus:ring-orange-500"
            placeholder="Stok"
            required
          />
          <input
            type="number"
            name="price_buy"
            onChange={handleChange}
            value={price_buy}
            className="bg-white rounded-md border-none focus:ring-orange-500"
            placeholder="Price exam: 5000000"
            required
          />
          <input
            type="number"
            name="price_sell"
            onChange={handleChange}
            value={price_sell}
            className="bg-white rounded-md border-none focus:ring-orange-500"
            placeholder="Sell price exam: 6000000"
            required
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
