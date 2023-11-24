import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();

    const options = props.options;
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]); // Initialize with the first option
    const [finalPrice, setFinalPrice] = useState(qty * parseInt(options[size]));

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
        });
        console.log(data);
    };

    useEffect(() => {
        setFinalPrice(qty * parseInt(options[size]));
    }, [qty, size, options]);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "720px" }}>
                <img
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px", objectFit: "fill" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">This is something imp</p>
                    <div className="container w-100">
                        <select
                            className="m-2 h-100 bg-success"
                            style={{ backgroundColor: "#42b883", color: "white" }}
                            onChange={(e) => setQty(e.target.value)}
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <select
                            className="m-2 h-100 bg-success rounded"
                            style={{ backgroundColor: "#42b883", color: "white" }}
                            ref={priceRef}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>

                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div style={{ width: "300px" }}>
                        <button
                            className="btn btn-success justify-center ms-2"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
