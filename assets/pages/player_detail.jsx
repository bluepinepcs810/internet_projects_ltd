import React, { useCallback, useMemo, useState } from "react";
import { useAllTeams, usePlayerDetail } from "../hooks/api_hooks";
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Spinner, Typography } from "@material-tailwind/react";
import { useParams } from "react-router";
import { DEFAULT_PLAYER_PHOTO, DEFAULT_TEAM_LOGO } from "../helpers/constants";
import { Controller, useForm } from "react-hook-form";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { TeamApi } from "../api/team";
import { useQueryClient } from "react-query";
import { showError, showSuccess } from "../helpers/toastr";

const PlayerDetail = () => {
    const { teamId, playerId } = useParams();
    const { data: teams, isSuccess: teamsSuccess } = useAllTeams();

    const { data, isLoading, isSuccess } = usePlayerDetail(playerId);
    const [buyOpen, setBuyOpen] = useState(false);
    const [buying, setBuying] = useState(false);
    const queryClient = useQueryClient();

    const { register, formState: { errors }, handleSubmit, control, watch } = useForm({
        defaultValues: {
            amount: 0,
            teamId: '7'
        }
    })
    const trackTeamId = watch('teamId');
    const handleConfirm = useCallback((data) => {
        if (buying || !teamId || !playerId) return;
        setBuying(true);
        TeamApi.buy(data.teamId, playerId, data.amount)
            .then((response) => {
                queryClient.invalidateQueries({ queryKey: ['retrievePlayer'] });
                showSuccess(`${response.lastName} moved to ${response.team.name}`);
                setBuyOpen(false);
            })
            .catch((e) => {
                showError(e);
            })
            .finally(() => {
                setBuying(false);
            });
    }, [buying]);

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
                        <div className="flex relative w-full gap-x-10 py-16 px-10 rounded-xl" style={{ backgroundImage: 'url("/img/fb_p_bg.jpg")' }}>
                            <div className="flex">
                                <img src={data.photo || DEFAULT_PLAYER_PHOTO} className="max-w-[196px] rounded-lg object-cover" />
                            </div>
                            <div className="flex-grow flex justify-between">
                                <div className="flex flex-col justify-center">
                                    <Typography variant="h3" color="white" className="mb-4">
                                        {data.firstName}
                                    </Typography>
                                    <Typography variant="h1" color="white" className="mb-10">
                                        {data.lastName}
                                    </Typography>
                                    {data.team &&
                                        <div className="flex gap-x-4 items-center">
                                            <div>
                                                <img src={data.team.logo} className="w-10 h-10 rounded-full object-contain"/>
                                            </div>
                                            <Typography variant="h5" color="white">
                                                {data.team.name}
                                            </Typography>
                                        </div>
                                    }
                                </div>
                                <div className="flex px-5 items-end">
                                    <Button
                                        variant="filled"
                                        className="bg-cyan-200 text-blue-900 min-w-[200px]"
                                        onClick={() => setBuyOpen(true)}
                                    >
                                        Buy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                </CardBody>
            </Card>
            {data && teamId &&
                <Dialog open={buyOpen} variant="gradient">
                    <DialogHeader>Are you really want { data.firstName } { data.lastName }?</DialogHeader>
                    <DialogBody divider>
                        <div className="flex flex-col gap-y-6">
                            <div>
                                <Input
                                    label="Amount"
                                    {...register('amount', {
                                        required: 'Please input amount',
                                        valueAsNumber: true,
                                        validate: (value) => value < 0 ? 'Please input positive amount' : true
                                    })}
                                    type="number"
                                    error={!!errors.amount}
                                />
                                {errors.amount && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                        <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                        {errors.amount.message}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                {teamsSuccess && teams &&
                                    <Controller
                                        name="teamId"
                                        control={control}
                                        rules={{ required: "Please select team" }}
                                        render={({ field }) => (
                                            <>
                                                    <Select {...field} label="To Team" value={trackTeamId}>
                                                        {teams.data.filter(item => item.id != teamId).map(team => (
                                                            <Option key={team.id} value={team.id.toString()}>
                                                                <div className="flex gap-x-2 items-center">
                                                                    <img src={team.logo || DEFAULT_TEAM_LOGO} className="w-6 h-4"/>
                                                                    <div>{team.name}</div>
                                                                </div>
                                                            </Option>
                                                        ))}
                                                    </Select>
                                            </>
                                        )}
                                    />
                                }
                            </div>
                        </div>

                    </DialogBody>
                    <DialogFooter>
                        {!buying &&
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => setBuyOpen(false)}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                        }
                        <Button variant="gradient" color="green" onClick={handleSubmit(handleConfirm)}>
                            {buying ? <Spinner className="w-4 h-4" /> : <span>Confirm</span>}
                        </Button>
                    </DialogFooter>
                </Dialog>
            }
        </div>
    )
}
export default PlayerDetail;
