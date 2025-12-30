import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'
import { toast } from 'react-toastify'
import Button from './button'

const Form = ({ mutationKey, btnText, reqType, reqUrl, PreviewMode = false, data }) => {

    const [FormInfo, setFormInfo] = useState({});
    const [Previews, setPreviews] = useState([])

    const handleChange = (e) => {
        console.log(FormInfo);

        if (e.target.dataset.multi_options) {

            const { name, value } = e.target;
            setFormInfo((prev) => ({

                ...prev,
                [name]: Array.isArray(prev[name])
                    ? Array.from(new Set([...prev[name], value]))
                    : [value]


            }))
            return;
        }

        const { name, value } = e.target;

        if (e.target.files) {
            const files = e.target.files;
            if (!e.target.multiple) {
                setFormInfo((prev) => ({
                    ...prev,
                    [name]: files[0]
                }))
                return;
            }
            setFormInfo((prev) => ({
                ...prev,
                [name]: files
            }))
            return
        }

        setFormInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleForm = (e) => {
        e.preventDefault();
        const Form = new FormData();
        for (const key in FormInfo) {
            const value = FormInfo[key];

            if (Array.isArray(value)) {
                value.forEach((value) => {
                    Form.append(key, value)
                })
            }
            Form.append(key, FormInfo[key])
        }
        mutate(Form)
    }
    const mutationFn = async (Data) => {
        for (const [key, value] of Data.entries()) {
            console.log(key, value);
        }

        const response = await axiosInstance[reqType](reqUrl, Data)
        return response.data;

    }


    const { mutate, isPending } = useMutation({
        mutationKey: [mutationKey], mutationFn: mutationFn,
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })
    const handleImageChangePreview = (e) => {
        if (!PreviewMode) {
            return;
        }

        const files = Array.from(e.target.files);

        let img = files.map((img) => URL.createObjectURL(img))
        setPreviews(img)
    }

    useEffect(() => {
        return () => {
            Previews.forEach((imgPrev) => URL.revokeObjectURL(imgPrev))
        }
    }, [Previews])


    return (
        <FormSec>
            <div className="container_add_user">
                {
                    data?.map(({ MainHead, fields }) => {
                        return (
                            <>
                                <h2>{MainHead}</h2>
                                <form key={MainHead} action="" onSubmit={handleForm}>

                                    {
                                        fields?.map(({ label, name, type, accept, options, placeholder, required, multiple, multiple_options }) => {
                                            return (<div key={label + name} className="input">
                                                <label>{label}</label>
                                                {type === "select" ?
                                                    <select name={name} data-multi_options={multiple_options} id="" value={FormInfo[name] || []} onChange={handleChange}>
                                                        {options?.map(({ label, value }) => {
                                                            return <option value={value}>{label}</option>
                                                        })}
                                                    </select> : <input type={type} name={name} required={required} placeholder={placeholder} value={type !== "file" ? FormInfo[name] || "" : undefined}
                                                        {...(type === "file" && { accept: accept })}
                                                        {...(type === "file" && { multiple: multiple })}
                                                        onChange={(e) => { handleChange(e); PreviewMode && handleImageChangePreview(e) }} />
                                                }

                                            </div>
                                            )
                                        })
                                    }

                                    <div className="preview_wrapper flex gap-3">
                                        {
                                            Previews.map((src) => {

                                                return <img src={src} alt='' key={src} width={100} height={100} className='object-contain' />

                                            })
                                        }
                                    </div>


                                    <Button text={btnText} loading={isPending} />
                                </form>

                            </>
                        )
                    })
                }
            </div>

        </FormSec >
    )
}

export default Form


const FormSec = styled.div`
      display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
      background-color: var(--bg-main);



           .container_add_user{
              display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    min-width: 600px;
    margin: 0 auto;
     background-color: #0B1739;
           border: 1px solid #343B4F;
           border-radius: 12px;
    padding: 20px;

           }
       h2{
           color: white;
           font-weight:700;
           font-size: 24px;
       }
       h6{
           color: white;
           font-weight:700;
           text-decoration: underline;
           font-size: 14px;
           text-align: right;
       }
    label{
        color: white;
    }
    .input{
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
          input,select{
        border: 1px solid #343B4F;
        background-color: #0B1739;
        padding: 14px ;
        border-radius: 8px;
        color: white;
    }
     input::placeholder{
          color: var(--color-list);
    }
    select{
        color: white;
         
    }
`