import React, { useState } from 'react'
import { useCreateCollectionMutation } from '../../store/api/collectionApi';

const CollectionCreateForm = () => {

    const [CollectionName, setCollectionName] = useState("");
    const [createCollection,{data}] = useCreateCollectionMutation();

    const handleCreateCollection =  async () => {
        try {
              const result =await createCollection({name:CollectionName}).unwrap()
              setCollectionName("");
        } catch (error) {
              console.error('Failed to create collection:', err);
        }
    }

    return (
        <div className='container flex flex-col gap-4 bg-blue-600 p-10'>
            <h2>Collection Form</h2>
            <input type="text" value={CollectionName} placeholder='Collection Name' onChange={(e) => setCollectionName(e.target.value)} />
            <button type='submit' className='bg-black max-w-[300px] m-[auto] p-5' onClick={handleCreateCollection}>Create</button>
        </div>
    )
}

export default CollectionCreateForm
