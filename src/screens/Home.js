import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFoodItem(data[0]);
                setFoodCat(data[1]);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: 10 }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} on onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn btn-outline-success text-black" style={{ backgroundColor: 'green' }} type="submit">Search</button>
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?cheeseburger" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pasta" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {foodCat.length > 0
                    ? foodCat.map((data) => {
                        return (<div className="row mb-3">
                            <div key={data._id} className="fs-3 m-3">
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodItem.length > 0
                                ?
                                foodItem.filter((item) => (
                                    item.CategoryName === data.CategoryName &&
                                    item.name.toLowerCase().includes(search.toLowerCase())
                                ))

                                    .map(filterItems => {
                                        return (
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                <Card foodItem={filterItems}
                                                    options={filterItems.options[0]}
                                                ></Card>
                                            </div>

                                        )
                                    })
                                : <div>No Such Data Found</div>}
                        </div>
                        )
                    })
                    : <div>""</div>

                }

            </div>
            <div><Footer /></div>
        </div>
    )
}
