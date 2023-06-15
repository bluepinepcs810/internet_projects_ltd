import { Input, MenuItem, Select, Typography } from "@material-tailwind/react";
import React from "react";
// import ReactCountryFlag from "react-country-flag";
// import { countries } from "../helpers/location";

const TeamForm = () => {
    return (
        <div className="flex">
            <div className="team-info w-full md:w-1/2 px-4">
                <div className="form-control mb-5">
                    <Input label="Team Name" />
                </div>
                <div className="form-control mb-5">
                    <Select
                        label="Country"
                    >
                        {/* {countries.map(country => (
                            <MenuItem>
                                <div className="flex">
                                    <ReactCountryFlag countryCode={country.isoCode} />
                                    <div>{country.name}</div>
                                </div>
                            </MenuItem>
                        ))} */}
                    </Select>
                </div>
                <div className="form-control">
                    <Input label="Balance" />
                </div>
            </div>
            <div className="w-full md:w-1/2">
                Dropzone
            </div>
        </div>
    )
}
export default TeamForm
