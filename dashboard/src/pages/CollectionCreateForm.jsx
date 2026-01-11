import React from 'react'
import { useState } from 'react'

const CollectionCreateForm = () => {

    const [CollectionName, setCollectionName] = useState("")

    return (
        <div className='container flex flex-col gap-4 bg-green-600 p-10'>
            <input type="text" value={CollectionName} placeholder='Collection Name' onChange={(e) => setCollectionName(e.target.value)} />



            <button onClick={() => handleCollectionCreate()}>Create Collection</button>
        </div>
    )
}

export default CollectionCreateForm
