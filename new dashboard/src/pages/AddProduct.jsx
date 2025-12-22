import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../components/button'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'

const Adduser = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Price: '',
        Description: '',
        Role: 'User',
    })

    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImages(files)

        const previews = files.map(file => URL.createObjectURL(file))
        setPreviewImages(previews)
    }

    // cleanup previews
    useEffect(() => {
        return () => {
            previewImages.forEach(url => URL.revokeObjectURL(url))
        }
    }, [previewImages])

    const addProduct = async () => {
        const data = new FormData()

        data.append('Name', formData.Name)
        data.append('Price', formData.Price)
        data.append('Description', formData.Description)
        data.append('Role', formData.Role)

        images.forEach(img => data.append('Images', img))
        console.log(data)
        // return axiosInstance.post('/add', data)
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            alert('Product created successfully')
        },
        onError: (err) => {
            console.error(err)
        }
    })

    return (
        <AdduserSec>
            <div className="container_add_user">
                <h1>Add Product</h1>

                <div className="input">
                    <label>Name</label>
                    <input name="Name" value={formData.Name} onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Price</label>
                    <input name="Price" value={formData.Price} onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Description</label>
                    <input name="Description" value={formData.Description} onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Role</label>
                    <select name="Role" value={formData.Role} onChange={handleChange}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <div className="input">
                    <label>Images</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                </div>

                <div className="preview_wrapper flex gap-3">
                    {previewImages.map((src, i) => (
                        <img key={i} src={src} width={100} height={100} />
                    ))}
                </div>

                <Button text={isLoading ? 'Creating...' : 'Create Product'} onClick={mutate} />
            </div>
        </AdduserSec>
    )
}

export default Adduser
