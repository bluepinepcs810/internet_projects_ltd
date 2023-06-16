import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useDebounce from '../hooks/useDebounce';
import { usePlayerList } from '../hooks/api_hooks';
import { DEFAULT_TEAM_LOGO } from '../helpers/constants';
import { Button, Card, CardBody, CardHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import PlayerForm from '../components/player_form';
import { useQueryClient } from 'react-query';
import { countries } from '../helpers/location';

const Players = () => {
    const navigate = useNavigate();
    const { register, watch } = useForm({
        defaultValues: {
            search: ''
        }
    });
    const search = watch('search');
    const debouncedSearch = useDebounce(search, 500);

    const [adding, setAdding] = useState(false);
    const queryClient = useQueryClient();

    const {
        data,
        isSuccess,
        isFetching,
        hasNextPage,
        isLoading,
        fetchNextPage
    } = usePlayerList({ search: debouncedSearch });

    const onPlayerAdd = useCallback((response) => {
        queryClient.invalidateQueries({ queryKey: ['playerList'] });
        setAdding(false);
        navigate(`/players/${response.id}`);
    }, [queryClient])

    return (
        <div className='mt-12 mb-8 flex flex-col gap-12'>
            <Card>
                <CardHeader variant='gradient' color="blue" className='mb-8 p-6'>
                    <Typography variant="h6" color='white'>
                        Players
                    </Typography>
                </CardHeader>
                <CardBody className='overflow-x-auto px-4 pt-4 pb-2 min-h-[600px]'>
                    {adding &&
                        <div className="flex justify-center py-6 w-full">
                            <div className="w-full md:w-2/3">
                                <PlayerForm onSuccess={onPlayerAdd} />
                            </div>
                        </div>
                    }
                    <div className='flex justify-between'>
                        <div className='mr-auto md:mr-4 md:w-56'>
                            <Input label='Search Player' {...register('search')} />
                        </div>
                        <div className='flex'>
                            <Button
                                variant='gradient'
                                onClick={() => setAdding(old => !old)}
                            >{adding ? 'Cancel' : '+ Add a Player'}</Button>
                        </div>
                    </div>
                    <div className='w-full flex flex-wrap mt-10 gap-y-4'>
                        {isSuccess &&
                            data.pages.map(page =>
                                page.data.map(item => (
                                    <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 cursor-pointer " key={item.id}
                                        onClick={() => navigate(`${item.id}`)}
                                    >
                                        <div className={"rounded-md flex gap-x-4 cursor-pointer overflow-hidden w-full " +
                                            "border border-gray-200 p-2 hover:bg-gray-200"}
                                            key={item.id}
                                        >
                                            <div>
                                                <img src={item.photo} className="object-cover w-20 h-20 rounded-md" />
                                            </div>
                                            <div className="flex flex-col gap-y-1">
                                                <Typography className="text-lg">{item.firstName} {item.lastName}</Typography>
                                                <div>
                                                    {item.team &&
                                                        <div className='flex gap-x-2 mb-1'>
                                                            <>
                                                                <img src={item.team.logo || DEFAULT_TEAM_LOGO} className='w-6 h-6 object-contain' />
                                                                <Typography variant="small">{item.team.name}</Typography>
                                                            </>
                                                        </div>
                                                    }
                                                    {item.country &&
                                                        <div className='flex gap-x-2'>
                                                            <>
                                                                <img src={countries.find(c => item.country === c.name)?.flag} className='w-6 h-6 object-contain' />
                                                                <Typography variant="small">{countries.find(c => item.country === c.name)?.shortCode}</Typography>
                                                            </>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )))
                        }
                    </div>
                    <div className='flex justify-center mt-4 py-4'>
                        {(isLoading || isFetching) &&
                            <Spinner className='h-8 w-8' />
                        }
                        {!isLoading && hasNextPage && !isFetching &&
                            <Button
                                variant='outlined'
                                onClick={fetchNextPage}
                            >Load More</Button>
                        }
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default Players;
