import React from 'react';
import './css/Home.css'
// import banner1 from './Img/banner1.jpg';
import laptops from './Img/laptops.jpg'
import phones from './Img/phones.jpg'
import tablets from './Img/tabs.jpg'
import watch from './Img/watch.png'
import buds from './Img/buds.png'

function Home() {
    return (
        <>
            <div className="popular_links">
                <p>NEW!</p>
                <a href="/product/1">Samsung S24</a>
                <a href="/product/2">Redimi Watch 3</a>
                <a href="/product/3">Lenovo Ideapad 1</a>
                <a href="/product/4">Galaxy Tab S6</a>
            </div>
            <div className="banner"></div>
            <div className="categories_bar">
                <p>Popular Categories</p>
                <div>
                    <a href='/products/laptops'><div><img src={laptops} alt='laptops' /><p>Laptops</p></div></a>
                    <a href='/products/phones'><div><img src={phones} alt='phones' /><p>Mobile Phones</p></div></a>
                    <a href='/products/tablets'><div><img src={tablets} alt='tablets' /><p>Tablets</p></div></a>
                    <a href='/products/watches'><div><img src={watch} alt='watch' /><p>Smart Watches</p></div></a>
                    <a href='/products/ear_buds'><div><img src={buds} alt='ear_buds' /><p>Ear Buds</p></div></a>
                    <a href='/products/monitors'><div><img src={laptops} alt='laptops' /><p>Monitors</p></div></a>
                    <a href='/products/tv'><div><img src={laptops} alt='laptops' /><p>Smart TV</p></div></a>
                </div>
            </div>
        </>
    );
}

export default Home;
