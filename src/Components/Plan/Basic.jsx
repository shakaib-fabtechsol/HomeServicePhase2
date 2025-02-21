import React from 'react'

const Basic = () => {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-2xl font-medium myhead">Plan Title</h2>
                <p className="text-3xl myhead font-bold">$200</p>
            </div>
            <p className="text-sm myblack mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi tellus diam, dignissim tincidunt quam vel, rutrum
                egestas lacus. Phasellus accumsan fermentum dolor eu
                gravida. Vivamus dignissim augue sed orci interdum vehicula.
            </p>
            <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                <li>3 Workers</li>
                <li>Delivered Within 2 Days</li>
            </ul>
        </div>
    )
}

export default Basic