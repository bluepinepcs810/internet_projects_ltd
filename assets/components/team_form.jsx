import React, { useCallback, useState } from "react";
import { Button, Input, Option, Select, Spinner, Typography } from "@material-tailwind/react";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../helpers/location";
import Rdropzone from "./rdropzone";
import { Controller, useForm } from "react-hook-form";
import { TeamApi } from "../api/team";
import { showError, showSuccess } from "../helpers/toastr";
import { useNavigate } from "react-router";
import { InformationCircleIcon } from "@heroicons/react/24/solid"

const TeamForm = ({ data }) => {
    const {
        register,
        formState: { errors },
        control,
        watch,
        setValue,
        clearErrors,
        handleSubmit
    } = useForm({
        defaultValues: {
            name: data?.name,
            country: data?.country,
            money: data?.money,
            logo: data?.logo
        }
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logo = watch('logo', null);

    const handleLogoChange = useCallback((file) => {
        if (file.file) {
            if (file.file.size > 2000000) {
                setErrors(old => ({...old, logo: ['Sorry, image should be less than 2MB']}))
                return;
            }
        }
        setValue('logo', file);
    })

    const onSubmit = useCallback((data) => {
        clearErrors();
        if (loading) return;
        setLoading(true);
        TeamApi.create(data)
            .then(response => {
                console.log({ response });
                showSuccess('Successfully create');
                navigate('/teams/' + response.id);
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
                    <div className="team-info w-full md:w-1/2 pr-4">
                        <div className="form-control mb-5">
                            <Input
                                label="Team Name"
                                {...register('name', {
                                    required: 'Please input team name',
                                    maxLength: {
                                        message: 'Name should be less than 50',
                                        value: 50
                                    }
                                })}
                                error={!!errors.name}
                            />
                            {errors.name && (
                                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                    {errors.name.message}
                                </Typography>
                            )}
                        </div>
                        <div className="form-control mb-5">
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Please select country" }}
                                render={({ field }) => (
                                    <Select {...field} label="Country">
                                        {countries.map(country => (
                                            <Option key={country.isoCode} value={country.name}>
                                                <div className="flex gap-x-2 items-center">
                                                    <ReactCountryFlag
                                                        countryCode={country.isoCode}
                                                        svg
                                                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                                        cdnSuffix="svg"
                                                    />
                                                    <div>{country.name}</div>
                                                </div>
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.country && (
                                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                    {errors.country.message}
                                </Typography>
                            )}
                        </div>
                        <div className="form-control">
                            <Input label="Balance" type="number"
                                {...register('money', {
                                    required: 'Please input current balance for the team',
                                    valueAsNumber: true,
                                    validate: (value) => value > 0
                                })}
                            />
                            {errors.money && (
                                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                    {errors.money.message}
                                </Typography>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Rdropzone dropzoneClass="h-40"
                            onChange={handleLogoChange}
                            file={logo}
                        />
                        {errors.logo && (
                                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" color="red" />
                                    {errors.logo.message}
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
export default TeamForm
