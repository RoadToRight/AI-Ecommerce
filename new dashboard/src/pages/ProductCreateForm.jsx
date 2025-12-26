import React, { use, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'

const ProductCreateForm = () => {

    const data = useQuery({
        queryFn: () => axiosInstance.post(""),
        enabled: false
    })

    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Category, setCategory] = useState("")
    const [Stock, setStock] = useState(0)
    const [Images, setImages] = useState([])
    const [PreviewImages, setPreviewImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    }

    const handleProductCreate = async () => {

    }


    return (
        <div className='container flex flex-col gap-4 bg-blue-600 p-10'>
            <input type="text" value={Name} placeholder='Product Name' onChange={(e) => setName(e.target.value)} />
            <input type="text" value={Description} placeholder='Product Description' onChange={(e) => setDescription(e.target.value)} />
            <input type="text" value={Price} placeholder='Product Price' onChange={(e) => setPrice(e.target.value)} />
            <select name="example" id="example" defaultValue="">
                <option value="" disabled hidden>Select Product Categories</option>
                {/* {
                    collections?.Collections?.map((collection) => {
                        return <option key={collection.name} value="">{collection.name}</option>
                    })
                } */}

            </select>
            <input type="number" value={Stock} placeholder='Product stock' onChange={(e) => setStock(e.target.value)} />
            <input
                type="file"
                accept='image/*'
                multiple
                onChange={handleImageChange}
            />

            {/* Images Preview */}

            <div className="preview_wrapper flex gap-3">
                {
                    PreviewImages.map((src) => {

                        return <img src={src} alt='' key={src} width={100} height={100} className='object-contain' />

                    })
                }
            </div>

            <button onClick={() => handleProductCreate()}>Create Product</button>
        </div>
    )
}

export default ProductCreateForm
