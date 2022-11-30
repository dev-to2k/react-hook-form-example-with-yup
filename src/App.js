import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TIME_SLOTS } from './constants';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validateForm = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  fee: Yup.number().required('Fee is required').typeError('Fee must be number'),
  instruction: Yup.string().required('Instruction is required'),
});

export default function App() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timeSlots: TIME_SLOTS,
    },
    mode: 'all',
    resolver: yupResolver(validateForm),
  });

  const submitData = (data) => {
    console.info('data', data);
    console.info(data.timeSlots.filter((item) => item.checked)[0]);
  };

  const { timeSlots } = getValues();

  const handleCheckTimeSlot = (e, i) => {
    const isCheck = e.target.checked;

    const newTimeSlots = timeSlots.map((item, _i) => {
      if (_i === i) {
        return {
          ...item,
          checked: isCheck,
        };
      }
      return { ...item, checked: false };
    });

    reset({
      timeSlots: newTimeSlots,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col gap-y-4 p-4"
      >
        <div className="name flex flex-col">
          <input
            type="text"
            placeholder="Enter name"
            {...register('name')}
            className="rounded border bg-gray-50 p-2"
          />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}
        </div>
        <div className="fee flex flex-col">
          <input
            type="text"
            placeholder="Enter fee"
            {...register('fee')}
            className="rounded border bg-gray-50 p-2"
          />
          {errors.fee && (
            <small className="text-red-500">{errors.fee.message}</small>
          )}
        </div>
        <div className="instruction flex flex-col">
          <textarea
            type="text"
            {...register('instruction')}
            placeholder="Enter instruction"
            className="rounded border bg-gray-50 p-2"
          />
          {errors.instruction && (
            <small className="text-red-500">{errors.instruction.message}</small>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 bg-indigo-200 p-2 rounded">
          <Controller
            control={control}
            name="timeSlots"
            render={({ field: { value } }) =>
              value.map((item, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    onChange={(e) => handleCheckTimeSlot(e, i)}
                    className="mr-2 checked:bg-indigo-600"
                    checked={item.checked}
                  />
                  <span>{item.title}</span>
                </label>
              ))
            }
          />
          {errors.timeSlots && (
            <small className="text-red-500">{errors.timeSlots.message}</small>
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          submit
        </button>
      </form>
    </div>
  );
}
