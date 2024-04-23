import { Button, Modal, Table, Form, Input, message } from 'antd'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useState } from 'react'

const Users = () => {
    const fetcher = async (url) => {
        const { data } = await axios.get(url)
        return data
    }
    const { data: users } = useSWR('http://localhost:8080/users', fetcher)
    const [open, setOpen] = useState(false)
    const [userForm] = Form.useForm()
    const [formData, setFormData] = useState(null)

    const addUser = async (values) => {
        try {
            await axios.post('http://localhost:8080/users', values)
            message.success('success')
            mutate('http://localhost:8080/users')
        }
        catch (error) {
            message.error('failed')
        }
        finally {
            userForm.resetFields()
            setOpen(false)
        }
    }

    const saveUser = async (user) => {
        try {
            const id = formData._id
            await axios.put(`http://localhost:8080/users/${id}`, user)
            mutate('http://localhost:8080/users')
        }
        catch (error) {
            message.error('failed')
        }
        finally {
            setFormData(null)
            setOpen(false)
            userForm.resetFields()
        }
    }

    const onEditUser = (user) => {
        setFormData(user);
        userForm.setFieldsValue(user)
        setOpen(true)
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`)
            mutate('http://localhost:8080/users')
        }
        catch (error) {
            message.error('failed')
        }
    }

    /// images upload now 
    const imageUpload = (event) => {
        alert(event.target.files[0]);
    }

    return (
        <div className='px-8 py-8 bg-zinc-400 min-h-screen'>
            <Button className='mb-8 bg-white' onClick={() => setOpen(true)}>
                Add a User
            </Button>
            <Table
                columns={[
                    {
                        key: '1',
                        title: 'person',
                        dataIndex: 'person'
                    },

                    {
                        key: '2',
                        title: 'email',
                        dataIndex: 'email'
                    },
                    {
                        key: '3',
                        title: 'username',
                        dataIndex: 'username'
                    },
                    {
                        key: '4',
                        title: 'contact',
                        dataIndex: 'contact'
                    },
                    {
                        key: '5',
                        title: 'password',
                        dataIndex: 'password'
                    },
                    {
                        key: '6',
                        title: 'upload profile',
                        dataIndex: 'upload profile'
                    },
                    {
                        key: '7',
                        title: 'Action',
                        dataIndex: 'action',
                        render: (_, user) => (
                            <div className='flex gap-8'>
                                <Button onClick={() => onEditUser(user)}>
                                    Edit
                                </Button>
                                <Button onClick={() => deleteUser(user._id)}>
                                    Delete
                                </Button>
                            </div>
                        ),
                    },
                ]}
                dataSource={users}
                pagination={{ pageSize: 5 }}
            />
            <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
                <h1 className='text-2xl font-bold mb-5'>Users</h1>
                <Form form={userForm} onFinish={formData ? saveUser : addUser}>
                    <Form.Item name='person'>
                        <Input placeholder='enter person here' className='h-[40px]' required />
                    </Form.Item>

                    <Form.Item name='email'>
                        <Input placeholder='enter email here' className='h-[40px]' required />
                    </Form.Item>

                    <Form.Item name='username'>
                        <Input placeholder='enter username here' className='h-[40px]' required />
                    </Form.Item>


                    <Form.Item name='contact'>
                        <Input placeholder='enter contact here' className='h-[40px]' required />
                    </Form.Item>

                    <Form.Item name='password'>
                        <Input placeholder='enter Password here' className='h-[40px]' required />
                    </Form.Item>

                    <Form.Item name='images'>
                        <Input placeholder='upload photo' onChange={imageUpload} type='file' className='h-[40px]' required />
                    </Form.Item>


                    <Form.Item>
                        <Button htmlType='submit' className='bg-blue-500 hover:bg-transparent'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Users