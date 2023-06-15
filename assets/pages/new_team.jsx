import { Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import React from "react";
import TeamForm from "../components/team_form";

const NewTeam = () => {
    return (
        <div className='mt-12 mb-8 flex flex-col gap-12'>
            <Card>
                <CardHeader variant='gradient' color="blue" className='mb-8 p-6'>
                    <Typography variant="h6" color='white'>
                        New Team
                    </Typography>
                </CardHeader>
                <CardBody className='overflow-x-auto px-4 pt-4 pb-2 min-h-[600px]'>
                    <div className="flex justify-center">
                        <div className="w-full md:w-2/3">
                            <TeamForm />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default NewTeam;
