import { Avatar, Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router';

const Teams = () => {
    const navigate = useNavigate();

    return (
        <div className='mt-12 mb-8 flex flex-col gap-12'>
            <Card>
                <CardHeader variant='gradient' color="blue" className='mb-8 p-6'>
                    <Typography variant="h6" color='white'>
                        Teams
                    </Typography>
                </CardHeader>
                <CardBody className='overflow-x-auto px-4 pt-4 pb-2 min-h-[600px]'>
                    <div className='flex justify-between'>
                        <div className='mr-auto md:mr-4 md:w-56'>
                            <Input label='Search Team' />
                        </div>
                        <div className='flex'>
                            <Button
                                variant='gradient'
                                onClick={() => navigate('/teams/new')}
                            >+ Add a Team</Button>
                        </div>
                    </div>
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    {['', 'Name', 'Country', 'Balance', 'Players'].map(item => (
                                        <th
                                            key={item}
                                            className="border-b border-blue-gray-50 py-3 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >{item}</Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border-b border-blue-gray-50' style={{ maxWidth: '30px'}}>
                                        <div className='flex items-center gap-4'>
                                            <img src="http://t3.gstatic.com/images?q=tbn:ANd9GcTdlZboGqqXYQquR6s1qeDckeEdPetLAHMKbDaMpE0Pyn009AoV"
                                                className='w-24 h-16 object-contain'
                                            />
                                        </div>
                                    </td>
                                    <td className='border-b border-blue-gray-50'>
                                        FC. Barcelona
                                    </td>
                                    <td className='border-b border-blue-gray-50'>
                                        Spain
                                    </td>
                                    <td className='border-b border-blue-gray-50'>
                                        12512532
                                    </td>
                                    <td className='border-b border-blue-gray-50'>
                                        20
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default Teams;
