import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useTeamDetail } from "../hooks/api_hooks";
import { Card, CardBody, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { DEFAULT_TEAM_LOGO } from "../helpers/constants";
import { countries } from "../helpers/location";
import ReactCountryFlag from "react-country-flag";

const TeamDetail = () => {
    const { teamId } = useParams();
    const { data, isLoading, isSuccess } = useTeamDetail(teamId);

    const country = useMemo(() => {
        if (!data?.country) return null;
        return countries.find(item => item.name === data.country);
    }, [data]);

    return (
        <div className='mt-12 mb-8 flex flex-col gap-12'>
            <Card>
                {/* <CardHeader variant='gradient' color="blue" className='mb-8 p-6'>
                    <Typography variant="h6" color='white'>
                        {isLoading ? 'Loading ...' : isSuccess ? data.name : 'Error !'}
                    </Typography>
                </CardHeader> */}
                <CardBody className='p-0 pb-2 min-h-[600px]'>
                    {isLoading &&
                        <div className="flex justify-center items-center min-h-[300px]">
                            <Spinner className="w-10 h-10" />
                        </div>
                    }
                    {isSuccess && data &&
                        <div className="flex relative w-full gap-x-10 py-16 px-10 rounded-t-xl" style={{ backgroundImage: 'url("/img/fb_bg.png")' }}>
                            <div className="flex">
                                <img src={data.logo || DEFAULT_TEAM_LOGO} className="max-w-[196px]"/>
                            </div>
                            <div className="flex-grow flex justify-between">
                                <div>
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
                                        $634,663,000
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    }
                </CardBody>
            </Card>
        </div>
    )
}
export default TeamDetail;
