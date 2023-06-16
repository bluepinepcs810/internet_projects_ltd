import React, { useCallback, useState } from "react";
import { Button, Input, Option, Select, Spinner, Typography } from "@material-tailwind/react";
import Rdropzone from "./rdropzone";
import { Controller, useForm } from "react-hook-form";
import { showError, showSuccess } from "../helpers/toastr";
import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { PlayerApi } from "../api/player";
import { DEFAULT_TEAM_LOGO } from "../helpers/constants";
import { useAllTeams } from "../hooks/api_hooks";

const PlayerForm = ({ data, teamId, onSuccess }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        clearErrors,
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            firstName: data?.name,
            lastName: data?.country,
            teamId: teamId ?? (data?.teamId),
            photo: data?.photo
        }
    });

    const [loading, setLoading] = useState(false);

    const { data: teams, isSuccess: teamsSuccess } = useAllTeams();

    const photo = watch('photo', null);

    const handlePhotoChange = useCallback((file) => {
        if (file.file) {
            if (file.file.size > 2000000) {
                setErrors(old => ({...old, photo: ['Sorry, image should be less than 2MB']}))
                return;
            }
        }
        setValue('photo', file);
    }, [])

    const onSubmit = useCallback((data) => {
        clearErrors();
        if (loading) return;
        setLoading(true);
        PlayerApi.create(data)
            .then(response => {
                showSuccess('Successfully created');
                if (onSuccess) {
                    onSuccess(response);
                }
            })
            .catch(e => {
                showError(e);
                setLoading(false);
            })
    }, [clearErrors, loading]);

    return (
        <div className="px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="player-info w-full md:w-1/2 pr-4">
                        <div className="form-control mb-5">
                            <Input
                                label="First Name"
                                {...register('firstName', {
                                    required: 'Please input first name',
                                    maxLength: {
                                        message: 'First name should be less than 50',
                                        value: 50
                                    }
                                })}
                                error={!!errors.firstName}
                            />
                            {errors.firstName && (
                                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                    {errors.firstName.message}
                                </Typography>
                            )}
                        </div>
                        <div className="form-control mb-5">
                            <Input
                                label="Last Name"
                                {...register('lastName', {
                                    required: 'Please input last name',
                                    maxLength: {
                                        message: 'Last name should be less than 50',
                                        value: 50
                                    }
                                })}
                                error={!!errors.lastName}
                            />
                            {errors.lastName && (
                                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                    {errors.lastName.message}
                                </Typography>
                            )}
                        </div>
                        {!(data?.teamId) && !teamId && teamsSuccess && teams &&
                            <div className="form-control">
                                <Controller
                                    name="teamId"
                                    control={control}
                                    rules={{ required: "Please select team" }}
                                    render={({ field }) => (
                                        <>
                                            <Select {...field} label="To Team">
                                                {teams.data.map(team => (
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
                                {errors.teamId && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                        <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                        {errors.teamId.message}
                                    </Typography>
                                )}
                            </div>
                        }
                    </div>
                    <div className="w-full md:w-1/2">
                        <Rdropzone dropzoneClass="h-40"
                            onChange={handlePhotoChange}
                            file={photo}
                        />
                        {errors.photo && (
                            <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                {errors.photo.message}
                            </Typography>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        variant="gradient"
                        type="submit"
                    >{
                        loading ? <Spinner className="h-4 w-4" /> :
                        !!data ? 'Save' : 'Create'
                    }</Button>
                </div>
            </form>
        </div>
    )
}
export default PlayerForm
