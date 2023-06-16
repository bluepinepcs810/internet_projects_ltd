import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePlayerList, useTeamDetail } from "../hooks/api_hooks";
import { Button, Card, CardBody, CardHeader, Input, Spinner, Typography } from "@material-tailwind/react";
import { DEFAULT_TEAM_LOGO } from "../helpers/constants";
import { countries } from "../helpers/location";
import { useForm } from "react-hook-form";
import PlayerForm from "../components/player_form";
import { useQueryClient } from "react-query";
import useDebounce from "../hooks/useDebounce";

const TeamDetail = () => {
    const { teamId } = useParams();
    const { data, isLoading, isSuccess } = useTeamDetail(teamId);
    const [adding, setAdding] = useState(false);
    const navigate = useNavigate();

    const { register, watch } = useForm({
        defaultValues: {
            search: ''
        }
    });
    const search = watch('search');
    const country = useMemo(() => {
        if (!data?.country) return null;
        return countries.find(item => item.name === data.country);
    }, [data]);

    const queryClient = useQueryClient();

    const debouncedSearch = useDebounce(search, 500);

    const {
        data: playerList,
        isSuccess: playerLoadingSuccess,
        hasNextPage: hasNextPlayer,
        isLoading: playerLoading,
        isFetching: playerFetching,
        fetchNextPage: fetchNextPlayers
    } = usePlayerList({ search: debouncedSearch, teamId });

    const onPlayerAdd = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['playerList'] });
        setAdding(false);
    }, [queryClient])

    return (
        <div className='mb-8 flex flex-col gap-12'>
            <Card>
                <CardBody className='p-0'>
                    {isLoading &&
                        <div className="flex justify-center items-center min-h-[300px]">
                            <Spinner className="w-10 h-10" />
                        </div>
                    }
                    {isSuccess && data &&
                        <div className="flex relative w-full gap-x-10 py-14 px-10 rounded-xl" style={{ backgroundImage: 'url("/img/fb_bg.png")' }}>
                            <div className="flex">
                                <img src={data.logo || DEFAULT_TEAM_LOGO} className="max-w-[196px]"/>
                            </div>
                            <div className="flex-grow flex justify-between">
                                <div className="flex flex-col justify-center">
                                    <Typography variant="h1" color="white" className="mb-10">
                                        {data.name}
                                    </Typography>
                                    {country &&
                                        <div className="flex gap-x-4 items-center">
                                            <div>
                                                <img src={country.flag} />
                                            </div>
                                            <Typography variant="h5" color="white">
                                                {country.name}
                                            </Typography>
                                        </div>
                                    }
                                </div>
                                <div className="px-6 flex items-center">
                                    <Typography color="white" className="text-7xl">
                                        ${new Intl.NumberFormat().format(data.money)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    }
                </CardBody>
            </Card>
            {data &&
                <Card className="mt-6">
                    <CardHeader variant='gradient' color="blue" className='mb-8 p-6'>
                        <Typography variant="h6" color='white'>
                            { data.name }'s Players
                        </Typography>
                    </CardHeader>
                    <CardBody className='overflow-x-auto px-4 pt-4 pb-2 min-h-[600px]'>
                        {adding &&
                            <div className="flex justify-center py-6 w-full">
                                <div className="w-full md:w-2/3">
                                    <PlayerForm onSuccess={onPlayerAdd} teamId={teamId} />
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
                        <div className='w-full flex flex-wrap mt-10'>
                            {playerLoadingSuccess &&
                                playerList.pages.map(page =>
                                    page.data.map(item => (
                                        <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 cursor-pointer " key={item.id}
                                            onClick={() => navigate(`players/${item.id}`)}
                                        >
                                            <div className={"rounded-md flex gap-x-4 cursor-pointer overflow-hidden w-full " +
                                                "border border-gray-200 p-2 hover:bg-gray-200"}
                                                key={item.id}
                                            >
                                                <div>
                                                    <img src={item.photo} className="object-cover w-20 h-20 rounded-md" />
                                                </div>
                                                <div className="flex items-center">
                                                    <Typography className="text-xl">{item.firstName} {item.lastName}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    )))
                            }
                        </div>
                        <div className='flex justify-center mt-4 py-4'>
                            {(playerLoading || playerFetching) &&
                                <Spinner className='h-8 w-8' />
                            }
                            {!playerLoading && hasNextPlayer && !playerFetching &&
                                <Button
                                    variant='outlined'
                                    onClick={fetchNextPlayers}
                                >Load More</Button>
                            }
                        </div>
                    </CardBody>
                </Card>
            }
        </div>
    )
}
export default TeamDetail;
