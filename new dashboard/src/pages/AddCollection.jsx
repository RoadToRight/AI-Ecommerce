import React from 'react'
import Form from '../components/Form'
import { addCollection } from '../FormsConfig/AddCollection'

const AddCollection = () => {
    return (
        <div>
            <Form data={addCollection} btnText={"Create Collection"} mutationKey={"addCollection"} reqType={"post"} reqUrl={"/collections/create"} />
        </div>
    )
}

export default AddCollection
