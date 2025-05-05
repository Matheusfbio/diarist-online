/* eslint-disable no-useless-escape */
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useState } from 'react';
import type { formValue } from '@/types';

export default function CreateJobScreen() {
  const { register, handleSubmit, control, formState, setValue } =
    useForm<formValue>({
      defaultValues: {
        job: '',
        name_company: '',
        price: '',
        email: '',
      },
    });
  const { errors } = formState;

  const [formattedValue, setFormattedValue] = useState('');

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/\D/g, '');
    const numberValue = Number(rawValue) / 100;

    const formatted = numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    setFormattedValue(formatted);
    setValue('price', formatted);
  }

  const onSubmit = (data: formValue) => console.table(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-2  p-16 rounded-lg border-2 border-b-black-300"
      >
        <label htmlFor="job">Vaga</label>
        <input
          className="border-3 rounded-md p-1 -mb-2"
          type="text"
          alt="name"
          placeholder="Nome da vaga"
          {...register('job', {
            required: { value: true, message: 'Nome da vaga é obrigatorio' },
          })}
        />
        <p className="text-red-500">{errors.job?.message}</p>
        <label htmlFor="name_company">Nome da empresa</label>
        <input
          type="text"
          placeholder="Nome da empresa"
          {...register('name_company', {
            required: {
              value: true,
              message: 'Nome da empresa é obrigatorio',
            },
          })}
        />
        <p className="text-red-500">{errors.name_company?.message}</p>
        <label htmlFor="price">Valor</label>
        <input
          type="text"
          placeholder="Valor a ser pago"
          value={formattedValue}
          {...register('price', {
            pattern: {
              value: /^R?\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/,
              message: 'Formato de valor inválido (ex: 1000,00 ou R$ 1.000,00)',
            },
          })}
          onChange={handlePriceChange}
        />
        <p className="text-red-500">{errors.price?.message}</p>
        <label htmlFor="email">E-mail de contato</label>
        <input
          type="email"
          placeholder="E-mail"
          {...register('email', {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
              message: 'Formato do email invalido',
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== 'admin@example.com' ||
                  'Entre com um email diferente'
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith('baddomain.com') ||
                  'Dominio não suportado!'
                );
              },
            },
          })}
        />
        <p className="text-red-500">{errors.email?.message}</p>
        {/* <label htmlFor="date_start">Data de inicio</label>
      <input type="datetime" placeholder="Inicio" {...register} />
      <label htmlFor="date_end">Data de final</label>
      <input type="datetime" placeholder="Final" {...register} />
      <label htmlFor="responder">Resposavel</label>
      <input type="text" placeholder="Responsavel pela vaga" {...register} />
      <label htmlFor="contact">Contato</label>
      <input type="number" placeholder="Contato" {...register} />*/}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Criar Vaga
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
}
