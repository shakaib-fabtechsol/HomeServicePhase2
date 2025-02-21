import React, {useEffect, useState} from 'react';
import ChatApp from '../../Components/SuperAdmin/ChatApp'

const Supportc = () => {
    useEffect(() => {
        document.title = "Support";
      }, []);
    return (
        <div>
            <div className="mb-2">
                <h2 className="font-semibold text-3xl">Support</h2>
                <p className="text-gray-600">
                    Track and manage your favorite services.
                </p>
            </div>
            <ChatApp />
        </div>
    )
}

export default Supportc