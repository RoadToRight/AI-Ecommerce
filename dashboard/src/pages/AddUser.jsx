import React from 'react'
import Form from '../components/Form'
import { addUser } from '../FormsConfig/AddUser'

const AddUser = () => {

  
    return (
        <div>
            <Form data={addUser} btnText={"Add User"} mutationKey={"addUser"} reqType={"post"} reqUrl={"/auth/register"} />
        </div>
    )
}

export default AddUser
