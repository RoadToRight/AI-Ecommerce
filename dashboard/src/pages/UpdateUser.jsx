import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/button'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'
import { toast } from 'react-toastify'
import { useAppState } from '../customHooks/useAppState'


const UpdateUser = () => {

    const { user } = useAppState();
    const [AddUserInfo, setAddUserInfo] = useState({ Email: "", Password: "", Avatar: null, Name: "", Role: "" })

    const addUser = async () => {

        const formData = new FormData();

        formData.append("name", AddUserInfo.Name);
        formData.append("email", AddUserInfo.Email);
        formData.append("password", AddUserInfo.Password);
        formData.append("role", AddUserInfo.Role);
        if (AddUserInfo.Avatar) {
            formData.append("avatar", AddUserInfo.Avatar);
        }


        let resp = await axiosInstance.post("/auth/register", formData)
        return resp.data;

    }
    const { mutate, isPending, data } = useMutation({
        mutationKey: ["adduser"], mutationFn: addUser,
        onSuccess: (data) => {
            toast.success(data?.message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message)
        }
    })

    const handleAddUser = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setAddUserInfo(prev => ({
                ...prev,
                Avatar: file
            }));
            return;
        }

        const { name, value } = e.target;

        setAddUserInfo((prev) => (
            { ...prev, [name]: value }
        ))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    }




    return (
        <AdduserSec>
            <div className="container_update_user">
                <h1>Update User</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="input">
                        <label>Name</label>
                        <input type="text" name='Name' required placeholder={user?.name} value={AddUserInfo.Name} onChange={handleAddUser} />
                    </div>
                    <div className="input">
                        <label>Email address</label>
                        <input type="email" name='Email' required placeholder={user?.email} value={AddUserInfo.Email} onChange={handleAddUser} />
                    </div>
                    <div className="input">
                        <label>Current Password</label>
                        <input type="password" name='Password' required placeholder='Current Password' value={AddUserInfo.Password} onChange={handleAddUser} />
                    </div>
                    <div className="input">
                        <label>New Password</label>
                        <input type="password" name='Password' required placeholder='New Password' value={AddUserInfo.Password} onChange={handleAddUser} />
                    </div>
                    {
                        user.role === "Admin" ?
                            <div className="input">
                                <label>Role</label>
                                <select name="Role" id="" value={AddUserInfo.Role} onChange={handleAddUser}>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div> : null
                    }

                    <div className="input">
                        <label>Avatar</label>
                        <input type="file" accept='' name='Avatar' onChange={handleAddUser} />
                    </div>
                    <Button text={"Add User"} loading={isPending} />
                </form>
            </div>

        </AdduserSec >
    )
}

export default UpdateUser

const AdduserSec = styled.div`
      display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
      background-color: var(--bg-main);



           .container_update_user{
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
       h1{
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