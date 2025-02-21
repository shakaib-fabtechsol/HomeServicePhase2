import React from 'react'
import reviewuser from "../../assets/img/reviewuser.png";
import { Icon, Star } from "lucide-react";
import down from "../../assets/img/chevronDown.png";

const Review = () => {
    const starCounts = [
        { stars: 5, count: 488 },
        { stars: 4, count: 74 },
        { stars: 3, count: 14 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 },
    ];
    const reviews = [
        {
            name: "Patricia Sanders",
            userimg: [reviewuser],
            title: "Service Title",
            date: "Jan 20, 2024",
            rating: 5,
            review:
                "Sed mollis porttitor mauris eu egestas. Sed vel augue non massa maximus suscipit. Nulla a pharetra leo, eget cursus diam. Phasellus ultrices in urna in faucibus. Aliquam vulputate enim finibus condimentum tincidunt.",
        },
        {
            name: "Katie Sims",
            userimg: [reviewuser],
            title: "Service Title",
            date: "Jan 20, 2024",
            rating: 5,
            review:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis accumsan turpis. Phasellus tincidunt neque sed nunc mattis molestie. Praesent auctor metus sit amet elit finibus, ac sodales enim egestas.",
        },
    ];
    return (
        <div>
            <div className="flex gap-4 flex-wrap">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <div className="flex flex-wrap justify-end items-center gap-3 ms-auto">
                    <select
                        style={{
                            backgroundImage: `url(${down})`,
                            backgroundPosition: "5px",
                        }}
                        className="ps-6 text-[#414651] text-sm font-semibold focus:outline-none border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] back appearance-none bg-no-repeat"
                        name="byRate"
                        id="byRate"
                    >
                        <option value="" hidden>
                            Filter by Rate
                        </option>
                        <option value="">0$ to 99$</option>
                        <option value="">100$ to 199$</option>
                        <option value="">200$ to 299$</option>
                        <option value="">300$ to 399$</option>
                    </select>
                    <select
                        style={{ backgroundImage: `url(${down})`, backgroundPosition: "5px", }}
                        className="ps-6 text-[#414651] text-sm font-semibold focus:outline-none border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] back appearance-none bg-no-repeat" name="byService" id="byService">
                        <option value="" hidden>Filter by Service</option>
                        <option value="">Service 1</option>
                        <option value="">Service 2</option>
                        <option value="">Service 3</option>
                        <option value="">Service 4</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 xl:px-10 mt-6">
                <div className="text-center md:text-left">
                    <p className="text-[40px] leading-normal font-bold">4.7</p>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                className="text-yellow-500 w-6 h-6"
                                fill="currentColor"
                            />
                        ))}
                    </div>
                    <p className="text-[#535862] mt-4 font-bold text-xs">(578 Reviews)</p>
                </div>
                <div className="ms-auto w-full lg:w-[70%]">
                    {starCounts.map(({ stars, count }) => (
                        <div key={stars} className="flex items-center gap-4 mb-1">
                            <span className="text-[10px] text-nowrap font-bold text-[#181D27]">
                                {stars} stars
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-yellow-500 h-2.5 rounded-full"
                                    style={{ width: `${(count / 578) * 100}%` }}
                                ></div>
                            </div>
                            <div>
                                <span className="text-[10px] font-medium text-[#181D27]">
                                    {count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8 space-y-8">
                {reviews.map((review, index) => (
                    <div key={index} className="border-t pt-4">
                        <div className="">
                            <p className="text-xs text-[#535862] mb-2 font-semibold">{review.date}</p>
                            <div className="flex items-center mb-2">
                                {[...Array(review.rating)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className="text-yellow-500 w-5 h-5"
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img
                                src={review.userimg}
                                alt=""
                                className="me-2 rounded-full w-[30px] h-[30px]"
                            />
                            <div>
                                <h3 className="font-bold text-sm">{review.name}</h3>
                                <p className="text-[10px] text-[#535862]">{review.title}</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#181D27] mt-2">{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Review