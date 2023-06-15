import React from "react";
import { useCallback } from "react"
import { useDropzone } from "react-dropzone";
import { convertFileToFileType } from "../helpers/file";

const Rdropzone = ({
    dropzoneClass,
    onChange,
    file
}) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (!acceptedFiles.length) return;
        const serialized = convertFileToFileType(acceptedFiles[0]);
        onChange(serialized);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDrop
    });

    return (
        <div {...getRootProps()} className={"relative flex justify-center items-center border-2 border-dashed rounded-md group " + dropzoneClass}>
            {file && (
                <>
                    <img className="w-max-[200px] h-full absolute object-cover z-10" src={file.url ? file.url : file}/>
                    <div className="w-full h-full hidden group-hover:flex justify-center items-center z-20 bg-black opacity-50">
                        <div className="uppercase text-white">Drag & Drop Image File</div>
                    </div>
                </>
            )}
            {!file &&
                <div className="uppercase text-gray">Drag & Drop Image File</div>
            }
            <input {...getInputProps()} />
        </div>
    )
}
export default Rdropzone;
