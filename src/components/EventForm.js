import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EventForm = () => {

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title:</label>
                    <input 
                        {...register('title', { required: true })} 
                        placeholder="Event Title" 
                    />
                    {errors.title && <span>This field is required</span>}
                </div>

                <div>
                    <label>Description:</label>
                    <textarea 
                        {...register('description')} 
                        placeholder="Event Description"
                    />
                </div>

                <div>
                    <label>Date:</label>
                    <input 
                        type="date" 
                        {...register('date')}
                    />
                   
                </div>

                <div>
                    <label>Time:</label>
                    <input 
                        type="time" 
                        {...register('time')}
                    />
                </div>

                <div>
                    <label>Location:</label>
                    <input 
                        {...register('location', { required: true })} 
                        placeholder="Event Location" 
                    />
                    {errors.location && <span>This field is required</span>}
                </div>

                <div>
                    <label>Capacity:</label>
                    <input 
                        type="number" 
                        {...register('capacity')}
                        placeholder="Capacity"
                    />
                </div>

                <div>
                    <label>Private Event:</label>
                    <input 
                        type="checkbox" 
                        {...register('is_private')}
                    />
                </div>

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
