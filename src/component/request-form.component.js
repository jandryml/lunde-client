import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getAllRequestTypes} from '../data-service/RequestType.service';
import {createRequest} from '../data-service/Request.service';
import "./request-form.styles.css";

function RequestForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const [requestTypes, setRequestTypes] = useState([]);

    useEffect(() => {
        getAllRequestTypes().then((result) => {
            setRequestTypes(result.data)
        }).catch((error) => {
            console.error(error);
        })
    }, []);

    const onSubmit = (data) => {
        createRequest(data).catch((error) => {
            console.error(error);
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Kind of request</label>
            <select {...register("requestTypeId", {pattern: /^[^-1]$/i})}>
                <option value={-1} selected="selected" hidden="hidden">Choose here</option>
                {requestTypes &&
                requestTypes
                    .map((requestType) => (
                        <option key={requestType.id} value={requestType.id}>{requestType.name}</option>
                    ))}
            </select>
            {errors.requestTypeId?.type === 'pattern' && "Choose request type!"}

            <label>Email</label>
            <input {...register("email", {
                required: true, maxLength: 255, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i
            })} />
            {errors.email?.type === 'required' && "Email is required!"}
            {errors.email?.type === 'maxLength' && "Email max length is 255!"}
            {errors.email?.type === 'pattern' && "Invalid email format!"}

            <label>Policy Number</label>
            <input name="policyNumber" {...register("policyNumber", {
                required: true, maxLength: 255, pattern: /^[A-Za-z0-9]+$/i
            })} />
            {errors.policyNumber?.type === 'required' && "Policy number is required!"}
            {errors.policyNumber?.type === 'maxLength' && "Policy number max length is 255!"}
            {errors.policyNumber?.type === 'pattern' && "Policy number can be alphanumerical only!"}

            <label>Name</label>
            <input {...register("name", {
                required: true, maxLength: 255, pattern: /^[A-Za-z]+$/i
            })} />
            {errors.name?.type === 'required' && "Name is required!"}
            {errors.name?.type === 'maxLength' && "Name max length is 255!"}
            {errors.name?.type === 'pattern' && "Name can be alphabetical only!"}

            <label>Surname</label>
            <input {...register("surname", {
                required: true, maxLength: 255, pattern: /^[A-Za-z]+$/i
            })} />
            {errors.surname?.type === 'required' && "Surname is required!"}
            {errors.surname?.type === 'maxLength' && "Surname max length is 255!"}
            {errors.surname?.type === 'pattern' && "Surname can be alphabetical only!"}

            <label>Your request</label>
            <textarea  {...register("requestData", {
                required: true, maxLength: 5000
            })} />
            {errors.requestData?.type === 'required' && "Request content is required!"}
            {errors.requestData?.type === 'maxLength' && "Request content max length is 5000!"}

            <input value="Send request" type="submit"/>
        </form>
    );
}

export default RequestForm;