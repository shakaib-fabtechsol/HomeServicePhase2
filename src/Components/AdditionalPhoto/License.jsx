import React from 'react'
import random1 from "../../assets/img/random1.png";
import random2 from "../../assets/img/random2.png";
import random3 from "../../assets/img/random3.png";

const License = () => {
    const accordionData = [
        {
            images: [random1, random2, random3],
        },
    ];
    return (
        <div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                {accordionData[0].images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default License