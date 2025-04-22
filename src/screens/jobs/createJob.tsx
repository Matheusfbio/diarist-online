import { useForm } from 'react-hook-form';

export default function CreateJobScreen() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2  p-16 rounded-lg border-2 border-b-black-300'>
      <label htmlFor="name">Nome da vaga</label>
      <input type="text" alt='name' placeholder="Vaga" {...register} />
      <label htmlFor="name">Nome da empresa</label>
      <input type="text" placeholder="Nome da empresa" {...register} />
      <label htmlFor="name">Valor</label>
      <input type="text" placeholder="Valor a ser pago" {...register} />
      <label htmlFor="name">Data de inicio</label>
      <input type="datetime" placeholder="Inicio" {...register} />
      <label htmlFor="name">Data de final</label>
      <input type="datetime" placeholder="Final" {...register} />
      <label htmlFor="name">Resposavel</label>
      <input type="text" placeholder="Responsavel pela vaga" {...register} />
      <label htmlFor="name">Contato</label>
      <input type="number" placeholder="Contato" {...register} />
      <label htmlFor="name">E-mail de contato</label>
      <input type="email" placeholder="E-mail" {...register} />
      
    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => {setValue('name', 'Vaga')}}>
      Criar Vaga
    </button>
    </form>
  );
}