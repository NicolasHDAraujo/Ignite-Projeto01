import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const[type, setType] = useState('deposit');
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  
  //o tipo formEvent vem do React e possibilita utilizar os dados do evento do formulário
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault(); //prevenir a ação padrão do html

     await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return(
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type='button' 
        onClick={onRequestClose} 
        className='react-modal-close'
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder='Titulo' 
          value={title} 
          onChange={event => 
          setTitle(event.target.value)}//toda vez que for digitado um valor no campo, passa esse valor ao set
        />

        <input 
          type="number" 
          placeholder='Valor' 
          value={amount}
          onChange={event => 
            setAmount(Number(event.target.value))}//toda vez que for digitado um valor no campo, passa esse valor ao set //converte para number
        />

        <TransactionTypeContainer>
          <RadioBox 
            type='button'
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'} //passado para o styledcomponent como props Generics
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type='button'
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
         placeholder='Categoria' 
         value={category}
         onChange={event => 
          setCategory(event.target.value)}//toda vez que for digitado um valor no campo, passa esse valor ao set
        />
        <button type="submit">Cadastrar</button>
      </Container>    
    </Modal>
  )
}