import React from 'react'
import ServiceBox from '../../Components/ServiceBox'

const ProBucks = () => {
    const services = [
        {
            id: 1,
            title: "Plumbing Service",
            price: 50,
            description: "Fix your leaking pipes and taps.",
            tags: ["Plumbing", "Repair"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
        {
            id: 2,
            title: "House Cleaning",
            price: 30,
            description: "Professional house cleaning services.",
            tags: ["Cleaning", "Home"],
            image: "",
            publish: 2,
        },
    ];
  return (
    <div className='sm:pt-6'>
        <h3 className='sm:text-xl text-md text-black'>Showing full catalog results, giving you the <strong>widest verity</strong> of <strong>services...</strong> </h3>
        <p className='text-[#0000008A] text-xs'>60 results</p>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {services.map((service) => (
                    <ServiceBox
                        key={service.id}
                        title={service.title}
                        price={service.price}
                        description={service.description}
                        tags={service.tags}
                        image={service.image}
                        publish={service.publish}
                    />
                ))}
            </div>
    </div>
  )
}

export default ProBucks