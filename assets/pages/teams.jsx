import { Avatar, Button, Card, CardBody, CardHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { useTeamList } from '../hooks/api_hooks';
import { useForm } from 'react-hook-form';
import { DEFAULT_TEAM_LOGO } from '../helpers/constants';
import useDebounce from '../hooks/useDebounce';

const Teams = () => {
    const navigate = useNavigate();
    const { register, watch } = useForm({
        defaultValues: {
            search: ''
        }
    });
    const search = watch('search');
    const debouncedSearch = useDebounce(search, 500);
    const {
        data,
        isSuccess,
        hasNextPage,
        isLoading,
        fetchNextPage
    } = useTeamList({ search: debouncedSearch });

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
                            <Input label='Search Team' {...register('search')} />
                        </div>
                        <div className='flex'>
                            <Button
                                variant='gradient'
                                onClick={() => navigate('/teams/new')}
                            >+ Add a Team</Button>
                        </div>
                    </div>
                    <div className='w-full overflow-x-auto min-h-[300px]'>
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
                                {isSuccess &&
                                    data.pages.map(page =>
                                        page.data.map(item => (
                                            <tr key={item.id} className='hover:bg-blue-gray-100 transition cursor-pointer'
                                                onClick={() => navigate(`/teams/${item.id}`)}
                                            >
                                                <td className='border-b border-blue-gray-50' style={{ maxWidth: '30px'}}>
                                                    <div className='flex items-center gap-4 p-2'>
                                                        <img src={item.logo || DEFAULT_TEAM_LOGO}
                                                            className='w-20 h-16 object-contain'
                                                        />
                                                    </div>
                                                </td>
                                                <td className='border-b border-blue-gray-50'>
                                                    {item.name}
                                                </td>
                                                <td className='border-b border-blue-gray-50'>
                                                    {item.country}
                                                </td>
                                                <td className='border-b border-blue-gray-50'>
                                                    {item.money??0}
                                                </td>
                                                <td className='border-b border-blue-gray-50'>
                                                    {item.playerCount}
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }

                            </tbody>
                        </table>
                        <div className='flex justify-center mt-4'>
                            {isLoading &&
                                <Spinner className='h-8 w-8' />
                            }
                            {!isLoading && hasNextPage &&
                                <Button
                                    variant='outline'
                                    onClick={fetchNextPage}
                                >Load More</Button>
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default Teams;
